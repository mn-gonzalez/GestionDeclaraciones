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

        $deudor = DB::table('deudor')->where('rut', '=', $data['rut'])->first();

        if(!$deudor){
            return response(['El usuario no es correcto']);
        }
        else{
            if(!Hash::check($data['contrasena'], $deudor->contrasena)){
                return response(['La contraseña no es correcta']);
            }
            else{
                $usuario = new Deudor($data);
                $token = $usuario->createToken('auth_token')->plainTextToken;
                $response = ['mensaje'=>'Inicio de sesion exitoso', 'rut_usuario' => $data['rut'],'token' => $token];
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

        $funcionario = DB::table('funcionario')->where('rut', '=', $data['rut'])->first();

        if(!$funcionario){
            return response(['El usuario no es correcto']);
        }
        else{
            if(!Hash::check($data['contrasena'], $funcionario->contrasena)){
                return response(['La contraseña no es correcta']);
            }
            else{
                $usuario = new Funcionario($data);
                $token = $usuario->createToken('auth_token')->plainTextToken;
                $response = ['mensaje'=>'Inicio de sesion exitoso', 'rut_usuario' => $data['rut'],'token' => $token];
                return response($response, 200);
            }
        }
    }

}

