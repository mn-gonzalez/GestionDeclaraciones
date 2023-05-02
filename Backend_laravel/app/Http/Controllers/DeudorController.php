<?php

namespace App\Http\Controllers;

use App\Models\Deudor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DeudorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function listado_deudores(Request $request)
    {
        $deudores = DB::table('persona')
            ->select('persona.rut', 'persona.nombres', 'persona.ap_paterno', 'persona.ap_materno')
            ->join('deudor', 'persona.rut', '=', 'deudor.rut')->get();

        return response($deudores, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function registrar(Request $request)
    {
        $data = $request->validate([
            'rut' => 'required|max:12',
            'nombres' =>'required',
            'ap_paterno' => 'required',
            'ap_materno' => 'required',
            'correo' => 'required|email',
            'telefono' => 'nullable',
            'contrasena' => 'required',
            'ciudad' => 'nullable',
            'comuna' => 'nullable',
            'region' => 'nullable',
            'direccion' => 'nullable'
        ]);

        $data['contrasena'] = bcrypt($request->contrasena);

        DB::table('persona')->insert([
            'rut'=> $data['rut'],
            'nombres' => $data['nombres'],
            'ap_paterno' =>$data['ap_paterno'],
            'ap_materno' => $data['ap_materno'],
            'correo'=> $data['correo']
        ]);

        DB::table('deudor')->insert([
            'rut' => $data['rut'],
            'telefono' => $data['telefono'],
            'contrasena' => $data['contrasena'],
            'ciudad' => $data['ciudad'],
            'comuna' => $data['comuna'],
            'region' => $data['region'],
            'direccion' => $data['direccion']
        ]);

        $deudor = new Deudor($data);
        $token = $deudor->createToken('auth_token')->plainTextToken;
        $response = ['mensaje' => 'El deudor se ha registrado correctamente', 'token' => $token];
        return response($response, 200);
    }

    public function obtener_datos(string $rut_deudor)
    {
        $usuario = DB::table('persona')->where('rut', $rut_deudor)->first();
        $response = [
            'rut' => $usuario->rut,
            'nombres' => $usuario->nombres,
            'ap_paterno' => $usuario->ap_paterno,
            'ap_materno' => $usuario->ap_materno
        ];

        return response($response, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Deudor  $deudor
     * @return \Illuminate\Http\Response
     */
    public function show(Deudor $deudor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Deudor  $deudor
     * @return \Illuminate\Http\Response
     */
    public function edit(Deudor $deudor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Deudor  $deudor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Deudor $deudor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Deudor  $deudor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Deudor $deudor)
    {
        //
    }
}
