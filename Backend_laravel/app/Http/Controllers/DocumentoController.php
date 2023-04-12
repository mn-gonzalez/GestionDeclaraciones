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
    public function registrar_documento_declaracion(Request $request, $rut_deudor, $id_declaracion)
    {
        $data = $request->validate([
            'tipo' => 'required',
            'documento' => 'required|mimes:pdf'
        ]);

        $documento = new Documento;
        if($request->file()) {
            $documento->tipo = $request->tipo;
            $nombre_documento = $request->documento->getClientOriginalName();
            /*
            $ubicacion_documento = Storage::putFileAs('declaraciones', 
                new File(''.$rut_deudor.'/'.$id_declaracion.'/documentacion'), 
                $nombre_documento);
            */
            $ubicacion_documento = $request->file('documento')->storeAs('declaraciones/'.$rut_deudor.'/'.$id_declaracion.'/documentacion', $nombre_documento, 'public');
            $documento->ubicacion = '/storage/' . $ubicacion_documento;

            DB::table('documento')->insert([
            'tipo' => $data['tipo'],
            'ubicacion' => $documento->ubicacion,
            'ref_declaracion' => $id_declaracion
            ]);

            $response = ['mensaje' => 'El documento se ha almacenado exitosamente.'];
            return response($response, 200);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Documento  $documento
     * @return \Illuminate\Http\Response
     */
    public function show(Documento $documento)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Documento  $documento
     * @return \Illuminate\Http\Response
     */
    public function edit(Documento $documento)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Documento  $documento
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Documento $documento)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Documento  $documento
     * @return \Illuminate\Http\Response
     */
    public function destroy(Documento $documento)
    {
        //
    }
}
