<?php

namespace App\Http\Controllers;

use App\Models\Revision;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RevisionController extends Controller
{
    
    public function registrar_revision(Request $request)
    {
        $data = $request->validate([
            'ref_tramite' => 'required',
            'ref_funcionario' => 'required',
            'fecha' => 'required',
            'comentarios' => 'nullable',
            'estado' => 'required'
        ]);

        DB::table('revision')->insert([
            'ref_tramite'=>$data['ref_tramite'],
            'ref_funcionario' => $data['ref_funcionario'],
            'fecha' => $data['fecha'],
            'comentarios' => $data['comentarios'],
            'estado' => $data['estado']
        ]);

        $response = ['mensaje' => 'Se ha registrado correctamente la revisión'];
        return response($response, 200);
    }


    public function obtener_revisiones(Request $request, $id_declaracion)
    {
        $revisiones = DB::table('revision')
            ->where('revision.ref_tramite', '=', $id_declaracion)
            ->get();

        return response()->json($revisiones);
    }

    public function actualizar_revision(Request $request, $id_revision){
        $data = $request->validate([
            'fecha' => 'required',
            'comentarios' => 'nullable',
            'estado' => 'required'
        ]);

        DB::table('revision')
        ->where('id', $id_revision)
        ->update([
            'fecha' => $data['fecha'],
            'comentarios' => $data['comentarios'],
            'estado'=> $data['estado']
        ]);

        $response = ['mensaje' => 'La revisión se ha actualizado correctamente'];
        return response($response, 200);
    }

    public function obtener_revision_por_funcionario(Request $request, $rut_funcionario, $id_declaracion){
        $revision = DB::table('revision')
            ->where('revision.ref_tramite', '=', $id_declaracion)
            ->where('revision.ref_funcionario', '=', $rut_funcionario)
            ->where('revision.estado', '=', 'EN REVISION')
            ->first();

        return response()->json($revision);
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Revision  $revision
     * @return \Illuminate\Http\Response
     */
    public function show(Revision $revision)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Revision  $revision
     * @return \Illuminate\Http\Response
     */
    public function edit(Revision $revision)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Revision  $revision
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Revision $revision)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Revision  $revision
     * @return \Illuminate\Http\Response
     */
    public function destroy(Revision $revision)
    {
        //
    }
}
