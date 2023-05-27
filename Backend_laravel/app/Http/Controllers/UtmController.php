<?php

namespace App\Http\Controllers;

use App\Models\Utm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UtmController extends Controller
{

    public function registrar_utm(Request $request)
    {
        $data = $request->validate([
            'year' => 'required',
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
            'year'=> $data['year'],
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

        $response = ['mensaje' => 'La utm del año'.$data['year'].'se ha registrado correctamente'];
        return response($response, 200);
    }

    public function listado_utm()
    {
        $listado_utm = DB::table('utm')->get();

        return response()->json($listado_utm);
    }

    public function datos_utm(Request $request, $year)
    {
        $utm = DB::table('utm')
            ->where('utm.year', $year)->first();

        return response()->json($utm);
    }

    public function actualizar_datos_utm(Request $request, $year)
    {
        $data = $request->validate([
            'year' => 'required',
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
            ->where('utm.year', $year)
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
}
