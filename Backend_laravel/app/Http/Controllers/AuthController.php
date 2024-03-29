<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\Deudor;
use App\Models\Persona;
use App\Models\Funcionario;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Password;
use App\Http\Controllers\EmailController;
use Psy\Util\Str;

class AuthController extends Controller
{
    public function __construct() 
    {
        $this->middleware(
            'auth:api', 
            [
                'except' => ['login_deudor', 'login_funcionario', 'recuperar_contrasena', 'reset_contrasena']
            ]
        );
    }

    public function login_deudor(Request $request)
    {
        $data = $request->validate(
            [
                'rut' => 'required',
                'contrasena' => 'required'
            ]
        );

        //$data['contrasena'] = bcrypt($request->contrasena);

        $deudor = DB::table('deudor')
            ->join('persona', 'persona.rut', '=', 'deudor.rut')
            ->where('deudor.rut', '=', $data['rut'])
            ->select(
                'persona.rut as rut', 
                'persona.nombres as nombres', 
                'persona.ap_paterno as ap_paterno', 
                'persona.ap_materno as ap_materno',
                'persona.contrasena as contrasena'
            )->first();

        if (!$deudor) {
            return response(['mensaje' => 'El usuario o la contraseña son incorrectas', 'login' => false]);
        } else {
            if (!Hash::check($data['contrasena'], $deudor->contrasena)) {
                return response(['mensaje' => 'El usuario o la contraseña son incorrectas', 'login' => false]);
            } else {
                $validator = Validator::make(
                    $request->all(), [
                    'rut' => 'required',
                    'contrasena' => 'required'
                    ]
                );

                if ($validator->fails()) {
                    return response()->json($validator->errors(), 422);
                }

                if (! $token = auth()->attempt(['rut' => $data['rut'], 'password' => $data['contrasena']])) {
                    return response()->json(['error' => 'Unauthorized'], 401);
                }
                return $this->createNewToken($token);
                //return response($response, 200);
            }
        }
    }

    public function login_funcionario(Request $request)
    {
        $data = $request->validate([
            'rut' => 'required',
            'contrasena' => 'required'
        ]);

        $funcionario = DB::table('funcionario')
        ->join('persona', 'persona.rut', '=', 'funcionario.rut')
        ->where('funcionario.rut', '=', $data['rut'])
        ->select('persona.rut as rut', 
                'persona.nombres as nombres', 
                'persona.ap_paterno as ap_paterno', 
                'persona.ap_materno as ap_materno',
                'persona.contrasena as contrasena')->first();

        if(!$funcionario){
            return response(['mensaje' => 'El usuario o la contraseña son incorrectas', 'login' => false]);
        }
        else{
            if(!Hash::check($data['contrasena'], $funcionario->contrasena)){
                return response(['mensaje' => 'El usuario o la contraseña son incorrectas', 'login' => false]);
            }
            else{
                $validator = Validator::make(
                    $request->all(), [
                    'rut' => 'required',
                    'contrasena' => 'required'
                    ]
                );

                if ($validator->fails()) {
                    return response()->json($validator->errors(), 422);
                }

                if (! $token = auth()->attempt(['rut' => $data['rut'], 'password' => $data['contrasena']])) {
                    return response()->json(['error' => 'Unauthorized'], 401);
                }
                return $this->createNewToken($token);
            }
        }
    }

    public function logout(Request $request)
    {
        /* $data = $request->validate([
            'rut' => 'required'
        ]);

        $deudor = Deudor::where('rut', $data['rut'])->first();
        $deudor->tokens()->delete();
        $response = ['logout'=> true];

        return response($response, 200); */

        auth()->logout();
        return response()->json(['mensaje' => 'Se ha cerrado la sesión exitosamente']);
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token) 
    {
        return response()->json(
            [
                'login' => true,
                'mensaje' => 'Inicio de sesion exitoso',
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 60,
                'usuario' => auth()->user()
            ]
        );
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile() 
    {
        return response()->json(auth()->user());
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh() 
    {
        return $this->createNewToken(auth()->refresh());
    }

    public function recuperar_contrasena(Request $request){
        $correo = strtolower($request->correo);

        $usuarios = Persona::get();

        foreach ($usuarios as $usuario) {
            if(isset($usuario->correo)){
                if($correo === strtolower($usuario->correo)){
                    //$status = Password::sendResetLink($request->only('email'));
                    $token = app('auth.password.broker')->createToken($usuario);
                    $nombre = $usuario->nombres.' '.$usuario->ap_paterno.' '.$usuario->ap_materno;
                    EmailController::enviar_recuperar_contrasena($nombre, $usuario->correo, $token);
                    return response(['mensaje' => 'Se ha enviado el correo para recuperar contraseña']);
                }
            }
        }

        return response(['mensaje' => 'El correo no se encuentra registrado']);
    }

    public function reset_contrasena(Request $request){
        $request->validate([
            'token' => 'required',
            'correo' => 'required|email',
            'contrasena' => 'required',
        ]);

        $correo = strtolower($request->correo);
        $usuarios = Persona::get();

        foreach ($usuarios as $usuario) {
            if(isset($usuario->correo)){
                if($correo === strtolower($usuario->correo)){
                    $usuario->contrasena = Hash::make($request->contrasena);
                    //$usuario->setRememberToken(Str::random(60));
                    $usuario->save();
                    return response(['mensaje' => 'La contraseña se ha actualizado correctamente']);
                }
            }
        }
    }

}

