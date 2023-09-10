<?php

namespace App\Http\Controllers;

use App\Models\Funcionario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FuncionarioController extends Controller
{
    public function registrar(Request $request)
    {
        $data = $request->validate([
            'rut' => 'required|max:12',
            'nombres' =>'required',
            'ap_paterno' => 'required',
            'ap_materno' => 'required',
            'correo' => 'required|email',
            'tipo_usuario' => 'required',
            'contrasena' => 'required'
        ]);

        $data['contrasena'] = bcrypt($request->contrasena);

        //registrar funcionario en la base de datos 
        DB::table('persona')->insert([
            'rut'=> $data['rut'],
            'nombres' => $data['nombres'],
            'ap_paterno' =>$data['ap_paterno'],
            'ap_materno' => $data['ap_materno'],
            'contrasena' =>$data['contrasena'],
            'correo'=> $data['correo']
        ]);

        DB::table('funcionario')->insert([
            'rut'=> $data['rut'],
            'tipo_usuario' => $data['tipo_usuario']
        ]);

        $funcionario = new Funcionario($data);
        $token = $funcionario->createToken('auth_token')->plainTextToken;
        $response = ['mensaje' => 'El funcionario se ha registrado correctamente', 'token' => $token];
        return response($response, 200);
    }

    public function listado_funcionarios(Request $request)
    {
        $funcionarios = DB::table('persona')
            ->join('funcionario', 'persona.rut', '=', 'funcionario.rut')
            ->select('persona.rut', 
                'persona.nombres', 
                'persona.ap_paterno', 
                'persona.ap_materno',
                'funcionario.tipo_usuario')->get();

        return response($funcionarios, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Funcionario  $funcionario
     * @return \Illuminate\Http\Response
     */
    public function edit(Funcionario $funcionario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Funcionario  $funcionario
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Funcionario $funcionario)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Funcionario  $funcionario
     * @return \Illuminate\Http\Response
     */
    public function destroy(Funcionario $funcionario)
    {
        //
    }
}
