<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ReportesController extends Controller
{
    public function deudores_con_declaraciones_entregadas(Request $request, $year)
    {
        $cantidad = DB::table('tramite')
            ->join('declaracion', 'declaracion.id', '=', 'tramite.id')
            ->where('tramite.estado', '=', 6)
            ->where('declaracion.year', '=', $year)
            ->selectRaw('count(tramite.id) as cantidad')
            ->pluck('cantidad')
            ->first();

        $deudores = DB::table('tramite')
            ->join('declaracion', 'declaracion.id', '=', 'tramite.id')
            ->join('persona', 'persona.rut', '=', 'tramite.rut_deudor')
            ->where('tramite.estado', '=', 6)
            ->where('declaracion.year', '=', $year)
            ->select('persona.rut', 'persona.nombres', 'persona.ap_paterno', 'persona.ap_materno')
            ->get();

        return response()->json(['cantidad'=> $cantidad, 'deudores'=>$deudores]);
    }

    public function deudores_con_declaraciones_sin_entregar(Request $request, $year)
    {
        $deudores = DB::select('SELECT persona.rut, 
            persona.nombres, 
            persona.ap_paterno, 
            persona.ap_materno
            FROM persona, deudor
            WHERE persona.rut = deudor.rut
            AND deudor.inicio_cobro <= '.$year.'
            AND persona.rut NOT IN (SELECT persona.rut
                FROM persona, deudor, tramite, declaracion
                WHERE persona.rut = deudor.rut
                AND tramite.rut_deudor = persona.rut
                AND declaracion.id = tramite.id
                AND declaracion.year = '.$year.')'
            );

        return response()->json(['deudores'=>$deudores]);
    }

    public function deudores_con_declaraciones_con_problemas(Request $request, $year)
    {
        $cantidad = DB::table('tramite')
            ->join('declaracion', 'declaracion.id', '=', 'tramite.id')
            ->where('tramite.estado', '=', 4)
            ->where('declaracion.year', '=', $year)
            ->selectRaw('count(tramite.id) as cantidad')
            ->pluck('cantidad')
            ->first();

        $deudores = DB::table('tramite')
            ->join('declaracion', 'declaracion.id', '=', 'tramite.id')
            ->join('persona', 'persona.rut', '=', 'tramite.rut_deudor')
            ->where('tramite.estado', '=', 4)
            ->where('declaracion.year', '=', $year)
            ->select('persona.rut', 'persona.nombres', 'persona.ap_paterno', 'persona.ap_materno')
            ->get();

        return response()->json(['cantidad'=>$cantidad, 'deudores'=>$deudores]);
    }

    public function deudores_con_postergacion(Request $request, $year)
    {
        $cantidad = DB::table('persona')
            ->join('deudor', 'deudor.rut', '=', 'persona.rut')
            ->join('tramite', 'tramite.rut_deudor', '=', 'persona.rut')
            ->join('postergacion', 'postergacion.id', '=', 'tramite.id')
            ->where('tramite.estado', '=', 3)
            ->selectRaw('count(persona.rut) as cantidad')
            ->pluck('cantidad')
            ->first();

        $deudores = DB::table('persona')
            ->join('deudor', 'deudor.rut', '=', 'persona.rut')
            ->join('tramite', 'tramite.rut_deudor', '=', 'persona.rut')
            ->join('postergacion', 'postergacion.id', '=', 'tramite.id')
            ->where('tramite.estado', '=', 3)
            ->select('persona.rut', 'persona.nombres', 'persona.ap_paterno', 'persona.ap_materno')
            ->get();

        return response()->json(['cantidad'=>$cantidad, 'deudores'=>$deudores]);
    }

    public function declaraciones_entregadas_mensualmente(Request $request, $year)
    {
        $nro_declaraciones_recibidas = DB::table('tramite')
            ->join('declaracion', 'declaracion.id', '=', 'tramite.id')
            ->where('declaracion.year', '=', $year)
            ->selectRaw('count(tramite.id) as cantidad')
            ->pluck('cantidad')
            ->first();

        $declaraciones_sin_revisar = DB::table('declaracion')
            ->join('tramite', 'tramite.id', '=', 'declaracion.id')
            ->where('tramite.estado', '=', 3)
            ->selectRaw('count(tramite.id) as cantidad')
            ->pluck('cantidad')
            ->first();

        $resultado = DB::select(
            'SELECT MONTHNAME(tramite.fecha) as mes, COUNT(*) as total 
            FROM tramite 
            INNER JOIN declaracion ON declaracion.id = tramite.id
            WHERE YEAR(tramite.fecha) = '.$year.'
            GROUP BY mes'
        );

        return response()->json(
            [
                'declaraciones_mensuales' => $resultado, 
                'nro_declaraciones' => $nro_declaraciones_recibidas,
                'declaraciones_sin_revisar' => $declaraciones_sin_revisar
            ] 
        );
    }

    public function revisiones_declaracion($id_declaracion)
    {

    }
}
