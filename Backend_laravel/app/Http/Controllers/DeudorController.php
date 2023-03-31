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

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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

        //$user = User::create($data);
        //$persona = Persona::registrar($data);
        //$deudor = Deudor::create($data);

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
