<?php

namespace App\Http\Controllers;

use App\Models\Documento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;

class DocumentoController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function registrar_documento_declaracion(Request $request, $rut_deudor, $id_declaracion)
    {
        $data = $request->validate([
            'nombre' => 'required',
            'tipo' => 'required',
            'documento' => 'required|mimes:pdf'
        ]);

        $documento = new Documento;
        if($request->file()) {
            $documento->tipo = $request->tipo;
            $nombre_documento = $request->nombre;
            $ubicacion_documento = 'declaraciones/'.$rut_deudor.'/'.$id_declaracion.'/documentacion/'.$nombre_documento.'.pdf';

            $existe = Storage::disk('public')->exists($ubicacion_documento);

            if($existe == false){
                $ubicacion_documento = $request->file('documento')->storeAs('declaraciones/'.$rut_deudor.'/'.$id_declaracion.'/documentacion', $nombre_documento.'.pdf', 'public');

                $documento->ubicacion = $ubicacion_documento;

                DB::table('documento')->insert([
                    'nombre'=>$data['nombre'],
                    'tipo' => $data['tipo'],
                    'ubicacion' => $documento->ubicacion,
                    'ref_declaracion' => $id_declaracion
                ]);

                $response = ['mensaje' => 'El documento se ha almacenado exitosamente.'];
                return response($response, 200);
            }

            $ubicacion_documento = $request->file('documento')->storeAs('declaraciones/'.$rut_deudor.'/'.$id_declaracion.'/documentacion', $nombre_documento.'.pdf', 'public');

            $response = ['mensaje' => 'El documento se ha almacenado exitosamente.'];
            return response($response, 200);
        }
    }

    public function obtener_listado_documentos_declaracion(Request $request, $rut_deudor, $id_declaracion)
    {
        $documentos = DB::table('documento')->where('ref_declaracion', $id_declaracion)->get();

        return response()->json($documentos);
    }

    public function obtener_documento(Request $request, $rut_deudor, $id_declaracion, $id_documento){
        $documento = DB::table('documento')->where('documento.id', '=', $id_documento)->first();
        $ubicacion = $documento->ubicacion;
        
        $documento = Storage::disk('public')->get($ubicacion);

        return response($documento, 200)->header('Content-Type', 'application/pdf');
    }

    public function obtener_url_documento(Request $request, $id_declaracion, $tipo_documento)
    {
        $documento = DB::table('documento')
            ->where('documento.tipo', '=', $tipo_documento)
            ->where('documento.ref_declaracion', '=', $id_declaracion)->first();
        $ubicacion = $documento->ubicacion;

        $url = url(Storage::url($ubicacion));
        return response()->json($url);
    }

    public function obtener_archivo_declaracion_firmada(Request $request, $rut_deudor, $id_declaracion)
    {
        $tipo_documento = 'DECLARACION_FIRMADA';
        $documento = DB::table('documento')
            ->where('documento.ref_declaracion', '=', $id_declaracion)
            ->where('documento.tipo', '=', $tipo_documento)
            ->first();

        $ubicacion = $documento->ubicacion;

        $documento = Storage::disk('public')->get($ubicacion);

        return response($documento, 200)->header('Content-Type', 'application/pdf');
    }

    public function eliminar_documento_declaracion(Request $request){
        $id_declaracion = $request->id_declaracion;
        $tipo_documento = $request->tipo_documento;

        $documento = DB::table('documento')
            ->where('ref_declaracion', '=', $id_declaracion)
            ->where('tipo', '=', $tipo_documento)
            ->first();


        $existe = Storage::disk('public')->exists($documento->ubicacion);

        if($existe){
            Storage::disk('public')->delete($documento->ubicacion);
        }

        DB::table('documento')
            ->where('ref_declaracion', '=', $id_declaracion)
            ->where('tipo', '=', $tipo_documento)
            ->delete();
        
        $response = ['mensaje' => 'El documento se ha eliminado exitosamente.'];
        return response($response, 200);
    }
}
