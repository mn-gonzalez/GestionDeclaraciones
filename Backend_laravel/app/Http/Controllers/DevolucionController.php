<?php

namespace App\Http\Controllers;

use App\Models\Devolucion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DevolucionController extends Controller
{
    public function registrar_devolucion(Request $request, $rut_deudor)
    {
        $data = $request->validate([
            'id' => 'required',
            'rut_deudor' => 'required',
            'nombres' => 'required',
            'ap_paterno' => 'required',
            'ap_materno' => 'required',
            'fecha' => 'required',
            'estado' => 'required',
            'correo' => 'nullable',
            'telefono' => 'nullable',
            'tipo_deuda' => 'required',
            'retiro_oficina' => 'required',
            'domicilio' => 'nullable',
            'solicitud' => 'required',
            'nombre_archivo' => 'required',
            'archivo' => 'nullable',
            'documento' => 'required|mimes:pdf'
        ]);

        $ubicacion_documento = $request->file('documento')->storeAs('devoluciones/'.$rut_deudor.'/'.$data['id'], $data['nombre_archivo'].'.pdf', 'public');

        DB::table('tramite')->insert([
            'id'=> $data['id'],
            'rut_deudor' => $data['rut_deudor'],
            'nombres' => $data['nombres'],
            'ap_paterno' =>$data['ap_paterno'],
            'ap_materno' => $data['ap_materno'],
            'fecha'=> $data['fecha'],
            'estado' => $data['estado']
        ]);

        DB::table('devolucion')->insert([
            'id' => $data['id'],
            'correo' => $data['correo'],
            'telefono' => $data['telefono'],
            'tipo_deuda' => $data['tipo_deuda'],
            'retiro_oficina' => $data['retiro_oficina'],
            'domicilio' => $data['domicilio'],
            'solicitud' => $data['solicitud'],
            'nombre_archivo' => $data['nombre_archivo'],
            'archivo' => $ubicacion_documento
        ]);

        $response = ['mensaje' => 'La devolución se ha registrado exitosamente'];
        return response($response, 200);
    }

    public function obtener_devoluciones(Request $request, $rut_deudor)
    {
        $devoluciones = DB::table('devolucion')->join('tramite', 'tramite.id', '=', 'devolucion.id')->where('tramite.rut_deudor', '=', $rut_deudor)->select('tramite.*','devolucion.*')->get();

        return response()->json($devoluciones);
    }

    public function obtener_devoluciones_sin_revisar(Request $request)
    {
        $devoluciones = DB::table('devolucion')->join('tramite', 'tramite.id', '=', 'devolucion.id')
            ->where('tramite.rut_deudor', '=', $rut_deudor)
            ->where('tramite.estado', '=', 2)
            ->select('tramite.*','devolucion.*')->get();

        return response()->json($devoluciones);
    }


    public function obtener_datos_devolucion(Request $request, $id_devolucion)
    {
       $devolucion = DB::table('devolucion')
            ->join('tramite', 'tramite.id', '=', 'devolucion.id')
            ->where('devolucion.id', '=', $id_devolucion)
            ->select('tramite.*','devolucion.*')->first();

        $aux_url = $devolucion->archivo;
        $url = url(Storage::url($aux_url));
        $devolucion->archivo = $url;
        
        return response()->json($devolucion);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Devolucion  $devolucion
     * @return \Illuminate\Http\Response
     */
    public function edit(Devolucion $devolucion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Devolucion  $devolucion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Devolucion $devolucion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Devolucion  $devolucion
     * @return \Illuminate\Http\Response
     */
    public function destroy(Devolucion $devolucion)
    {
        //
    }
}
