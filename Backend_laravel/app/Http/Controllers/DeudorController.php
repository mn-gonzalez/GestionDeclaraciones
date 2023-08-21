<?php

namespace App\Http\Controllers;

use App\Models\Deudor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

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
            'correo' => 'nullable',
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
            'correo'=> $data['correo'],
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()

        ]);

        DB::table('deudor')->insert([
            'rut' => $data['rut'],
            'telefono' => $data['telefono'],
            'contrasena' => $data['contrasena'],
            'ciudad' => $data['ciudad'],
            'comuna' => $data['comuna'],
            'region' => $data['region'],
            'direccion' => $data['direccion'],
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
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

    public function obtener_datos_completos(string $rut_deudor)
    {
        $usuario = DB::table('persona')
        ->join('deudor', 'deudor.rut', '=', 'persona.rut')
        ->where('persona.rut', $rut_deudor)
        ->select('persona.*','deudor.*')
        ->first();

        $response = [
            'rut' => $usuario->rut,
            'nombres' => $usuario->nombres,
            'ap_paterno' => $usuario->ap_paterno,
            'ap_materno' => $usuario->ap_materno,
            'correo' => $usuario->correo,
            'telefono' => $usuario->telefono,
            'direccion' => $usuario->direccion,
            'ciudad' =>$usuario->ciudad,
            'comuna' =>$usuario->comuna,
            'region' =>$usuario->region

        ];

        return response($response, 200);
    }

     public function actualizar_datos(Request $request, $rut_deudor)
    {
        $data = $request->validate([
            'correo' => 'nullable',
            'telefono' => 'nullable',
            'ciudad' => 'nullable',
            'comuna' => 'nullable',
            'region' => 'nullable',
            'direccion' => 'nullable'
        ]);

        DB::table('persona')
        ->where('persona.rut', '=', $rut_deudor)
        ->update([
            'correo'=> $data['correo']
        ]);

        DB::table('deudor')
        ->where('deudor.rut', '=', $rut_deudor)
        ->update([
            'telefono' => $data['telefono'],
            'ciudad' => $data['ciudad'],
            'comuna' => $data['comuna'],
            'region' => $data['region'],
            'direccion' => $data['direccion']
        ]);

        $response = ['mensaje' => 'Los datos se han actualizado correctamente'];
        return response($response, 200);
    }
}
