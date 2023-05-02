<?php

namespace App\Http\Controllers;

use App\Models\Utm;
use Illuminate\Http\Request;

class UtmController extends Controller
{

    public function registrar_utm(Request $request)
    {
        $data = $request->validate([
            'anio' => 'required'
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
            'diciembre' => 'required'
        ]);

        DB::table('utm')->insert([
            'anio'=> $data['anio'],
            'enero' => $data['enero'],
            'febrero' => $data['febrero'],
            'marzo' =>$data['marzo'],
            'abril' => $data['abril'],
            'mayo'=> $data['mayo'],
            'junio' => $data['junio'],
            'julio' => $data['julio'],
            'agosto' => $data['agosto'],
            'septiembre' => $data['septiembre'],
            'octubre' => $data['octubre'],
            'noviembre' => $data['noviembre'],
            'diciembre' => $data['diciembre']
        ]);

        $response = ['mensaje' => 'La utm del año'.$data['anio'].'se ha registrado correctamente'];
        return response($response, 200);
    }

    public function listado_utm()
    {
        $listado_utm = DB::table('utm')->get();

        return response()->json($listado_utm)
    }

    public function datos_utm(Request $request, $year)
    {
        $utm = DB::table('utm')
            ->where('utm.anio', $year)->first();

        return response()->json($utm);
    }

    public function actualizar_datos_utm(Request $request, $year)
    {
        $data = $request->validate([
            'anio' => 'required'
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
            'diciembre' => 'required'
        ]);

        DB::table('utm')
            ->where('utm.anio', $year)
            ->update([
            'enero' => $data['enero'],
            'febrero' => $data['febrero'],
            'marzo' =>$data['marzo'],
            'abril' => $data['abril'],
            'mayo'=> $data['mayo'],
            'junio' => $data['junio'],
            'julio' => $data['julio'],
            'agosto' => $data['agosto'],
            'septiembre' => $data['septiembre'],
            'octubre' => $data['octubre'],
            'noviembre' => $data['noviembre'],
            'diciembre' => $data['diciembre']
        ]);

        $response = ['mensaje' => 'Los datos de la utm se han actualizado correctamente'];
        return response($response, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Utm  $utm
     * @return \Illuminate\Http\Response
     */
    public function edit(Utm $utm)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Utm  $utm
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Utm $utm)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Utm  $utm
     * @return \Illuminate\Http\Response
     */
    public function destroy(Utm $utm)
    {
        //
    }
}
