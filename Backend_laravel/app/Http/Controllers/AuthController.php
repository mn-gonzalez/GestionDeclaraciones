<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\Deudor;
use App\Models\Funcionario;

class AuthController extends Controller
{
    public function login_deudor(Request $request)
    {
        $data = $request->validate([
            'rut' => 'required',
            'contrasena' => 'required'
        ]);

        //$data['contrasena'] = bcrypt($request->contrasena);

        $deudor = DB::table('deudor')
            ->join('persona', 'persona.rut', '=', 'deudor.rut')
            ->where('persona.rut', '=', $data['rut'])
            ->select('persona.rut as rut', 
                'persona.nombres as nombres', 
                'persona.ap_paterno as ap_paterno', 
                'persona.ap_materno as ap_materno',
                'deudor.contrasena as contrasena')->first();

        if(!$deudor){
            return response(['mensaje' => 'El rut ingresado no existe.', 'login' => false]);
        }
        else{
            if(!Hash::check($data['contrasena'], $deudor->contrasena)){
                return response(['mensaje' => 'La contraseña no es correcta.', 'login' => false]);
            }
            else{
                $usuario = new Deudor($data);
                $nombre = $deudor->nombres.' '.$deudor->ap_paterno.' '.$deudor->ap_materno;

                $token = $usuario->createToken('auth_token')->plainTextToken;
                $response = ['mensaje'=>'Inicio de sesión exitoso.', 
                'rut_usuario' => $data['rut'], 
                'nombre' => $nombre,
                'token' => $token];

                return response($response, 200);
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
        ->where('persona.rut', '=', $data['rut'])
        ->select('persona.rut as rut', 
                'persona.nombres as nombres', 
                'persona.ap_paterno as ap_paterno', 
                'persona.ap_materno as ap_materno',
                'funcionario.contrasena as contrasena')->first();

        if(!$funcionario){
            return response(['El rut ingresado no existe']);
        }
        else{
            if(!Hash::check($data['contrasena'], $funcionario->contrasena)){
                return response(['mensaje' => 'La contraseña no es correcta', 'login' => false]);
            }
            else{
                $usuario = new Funcionario($data);
                $nombre = $funcionario->nombres.' '.$funcionario->ap_paterno.' '.$funcionario->ap_materno;

                $token = $usuario->createToken('auth_token')->plainTextToken;
                $response = ['mensaje'=>'Inicio de sesion exitoso', 
                'rut_usuario' => $data['rut'],
                'nombre' => $nombre,
                'token' => $token];

                return response($response, 200);
            }
        }
    }

}

