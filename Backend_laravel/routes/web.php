<?php

use App\Mail\CorreoDeclaracion;
use App\Http\Controllers\EmailController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/pdf', function () {
    $year = date('Y')-1;
    $rut_deudor = '18892403';
    $id_declaracion = 'DEC18892403_2023';

    $declaracion = DB::table('tramite')
        ->join('declaracion','declaracion.id', '=', 'tramite.id')
        ->where('tramite.id', '=', $id_declaracion)
        ->select('tramite.*', 'declaracion.*')->first();

    $conyuge = DB::table('conyuge')
        ->where('conyuge.ref_declaracion', '=', $id_declaracion)->first();

    if($conyuge == null)
    {
        $conyuge = [
            'rut' => '',
            'nombres' => '',
            'ap_paterno' =>'',
            'ap_materno' => '',
            'enero'=> 0,
            'febrero' => 0,
            'marzo' => 0,
            'abril' => 0,
            'mayo' => 0,
            'junio' => 0,
            'julio' => 0,
            'agosto' => 0,
            'septiembre' => 0,
            'octubre' => 0,
            'noviembre' => 0,
            'diciembre' => 0,
            'enero_utm'=> 0,
            'febrero_utm' => 0,
            'marzo_utm' => 0,
            'abril_utm' => 0,
            'mayo_utm' => 0,
            'junio_utm' => 0,
            'julio_utm' => 0,
            'agosto_utm' => 0,
            'septiembre_utm' => 0,
            'octubre_utm' => 0,
            'noviembre_utm' => 0,
            'diciembre_utm' => 0
        ];
    }

    $utm = DB::table('utm')
    ->where('utm.year','=', $year)
    ->first();

    $data = [
        'declaracion'=>$declaracion,
        'conyuge'=>(object)$conyuge,
        'utm'=>$utm
    ];

    $pdf = PDF::loadView('declaracion', ['data' => $data])->setPaper('legal', 'portrait');;

    return $pdf->stream();
});
