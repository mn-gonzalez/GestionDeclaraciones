<?php

namespace App\Http\Controllers;

use App\Models\Postergacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PostergacionController extends Controller
{
    public function registrar_postergacion(Request $request, $rut_deudor){
        $data = $request->validate([
            'id' => 'required',
            'rut_deudor' => 'required',
            'nombres' => 'required',
            'ap_paterno' => 'required',
            'ap_materno' => 'required',
            'fecha' => 'required',
            'estado' => 'required',
            'motivo' => 'nullable',
            'nombre_archivo' => 'required',
            'archivo' => 'nullable',
            'documento' => 'required|mimes:pdf'
        ]);

        $ubicacion_documento = $request->file('documento')->storeAs('postergaciones/'.$rut_deudor.'/'.$data['id'], $data['nombre_archivo'].'.pdf', 'public');

        DB::table('tramite')->insert([
            'id'=> $data['id'],
            'rut_deudor' => $data['rut_deudor'],
            'nombres' => $data['nombres'],
            'ap_paterno' =>$data['ap_paterno'],
            'ap_materno' => $data['ap_materno'],
            'fecha'=> $data['fecha'],
            'estado' => $data['estado']
        ]);

        DB::table('postergacion')->insert([
            'id' => $data['id'],
            'motivo' => $data['motivo'],
            'nombre_archivo' => $data['nombre_archivo'],
            'archivo' => $ubicacion_documento
        ]);

        $response = ['mensaje' => 'La postergación se ha registrado exitosamente'];
        return response($response, 200);
    }

    public function datos_postergacion(Request $request, $id_postergacion){
        $postergacion = DB::table('postergacion')->join('tramite', 'tramite.id', '=', 'postergacion.id')
            ->where('tramite.id', '=', $id_postergacion)
            ->select('tramite.*','postergacion.*')->first();

        $aux_url = $postergacion->archivo;
        $url = url(Storage::url($aux_url));
        $postergacion->archivo = $url;

        return response()->json($postergacion);
    }

    public function obtener_postergaciones_deudor(Request $request, $rut_deudor){
        $postergaciones = DB::table('postergacion')->join('tramite', 'tramite.id', '=', 'postergacion.id')
            ->where('tramite.rut_deudor', '=', $rut_deudor)
            ->select('tramite.*','postergacion.*')->get();

        return response()->json($postergaciones);
    }

    public function postergaciones_sin_revisar(){
        $postergaciones = DB::table('postergacion')->join('tramite', 'tramite.id', '=', 'postergacion.id')
            ->where('tramite.estado', '=', 1)
            ->select('tramite.*','postergacion.*')->get();

        return response()->json($postergaciones);
    }
}
