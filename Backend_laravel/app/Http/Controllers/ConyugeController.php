<?php

namespace App\Http\Controllers;

use App\Models\Conyuge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ConyugeController extends Controller
{

    public function registrar_conyuge(Request $request, $rut_deudor, $id_declaracion)
    {
        $data = $request->validate([
            'rut' => 'required',
            'nombres' => 'required',
            'ap_paterno' => 'required',
            'ap_materno' => 'required',
            //'ref_declaracion' => 'required',
            'enero'=> 'required',
            'febrero'=> 'required',
            'marzo' => 'required',
            'abril' => 'required',
            'mayo' => 'required',
            'junio' => 'required',
            'julio' => 'required',
            'agosto' => 'required',
            'septiembre' => 'required',
            'octubre' => 'required', 
            'noviembre' => 'required',
            'diciembre' => 'required',
            'enero_utm' => 'required',
            'febrero_utm' => 'required',
            'marzo_utm' => 'required',
            'abril_utm' => 'required',
            'mayo_utm' => 'required',
            'junio_utm' => 'required',
            'julio_utm' => 'required',
            'agosto_utm' => 'required',
            'septiembre_utm' => 'required',
            'octubre_utm' => 'required',
            'noviembre_utm' => 'required',
            'diciembre_utm' => 'required'
        ]);

        DB::table('conyuge')->insert([
            'rut' => $data['rut'],
            'nombres' => $data['nombres'],
            'ap_paterno' =>$data['ap_paterno'],
            'ap_materno' => $data['ap_materno'],
            'ref_declaracion' => $id_declaracion,
            'enero'=> $data['enero'],
            'febrero' => $data['febrero'],
            'marzo' => $data['marzo'],
            'abril' => $data['abril'],
            'mayo' => $data['mayo'],
            'junio' => $data['junio'],
            'julio' => $data['julio'],
            'agosto' => $data['agosto'],
            'septiembre' => $data['septiembre'],
            'octubre' => $data['octubre'],
            'noviembre' => $data['noviembre'],
            'diciembre' => $data['diciembre'],
            'enero_utm'=> $data['enero_utm'],
            'febrero_utm' => $data['febrero_utm'],
            'marzo_utm' => $data['marzo_utm'],
            'abril_utm' => $data['abril_utm'],
            'mayo_utm' => $data['mayo_utm'],
            'junio_utm' => $data['junio_utm'],
            'julio_utm' => $data['julio_utm'],
            'agosto_utm' => $data['agosto_utm'],
            'septiembre_utm' => $data['septiembre_utm'],
            'octubre_utm' => $data['octubre_utm'],
            'noviembre_utm' => $data['noviembre_utm'],
            'diciembre_utm' => $data['diciembre_utm']
        ]);

        $response = ['mensaje' => 'Los datos del conyuge se han registrado correctamente'];
        return response($response, 200);
    }

    public function obtener_conyuge($rut_deudor, $id_declaracion)
    {
        $conyuge = DB::table('conyuge')->where('ref_declaracion', '=', $id_declaracion)->select('conyuge.*')->first();
        return response()->json($conyuge);
    }

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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\conyuge  $conyuge
     * @return \Illuminate\Http\Response
     */
    public function show(conyuge $conyuge)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\conyuge  $conyuge
     * @return \Illuminate\Http\Response
     */
    public function edit(conyuge $conyuge)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\conyuge  $conyuge
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, conyuge $conyuge)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\conyuge  $conyuge
     * @return \Illuminate\Http\Response
     */
    public function destroy(conyuge $conyuge)
    {
        //
    }
}
