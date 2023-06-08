<?php

namespace App\Http\Controllers;

use App\Models\Declaracion;
use App\Models\Documento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\File;
use Carbon\Carbon;
use PDF;

class DeclaracionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function declaraciones($rut_deudor)
    {
        $declaraciones = DB::table('declaracion')->join('tramite', 'tramite.id', '=', 'declaracion.id')->where('tramite.rut_deudor', '=', $rut_deudor)->select('tramite.*','declaracion.*')->get();
        return response()->json($declaraciones);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function registrar(Request $request)
    {
        $data = $request->validate([
            'id' => 'required',
            'rut_deudor' => 'required',
            'nombres' => 'required',
            'ap_paterno' => 'required',
            'ap_materno' => 'required',
            'fecha' => 'required',
            'estado' => 'required', 
            'year' => 'required',
            'correo' => 'nullable',
            'telefono' => 'nullable',
            'direccion' => 'nullable',
            'region' => 'nullable',
            'comuna' => 'nullable',
            'ciudad' => 'nullable',
            'estado_civil' => 'required',
            'afp' => 'required', 
            'trabajo' => 'nullable',
            'tel_trabajo' => 'nullable'
        ]);

        DB::table('tramite')->insert([
            'id'=> $data['id'],
            'rut_deudor' => $data['rut_deudor'],
            'nombres' => $data['nombres'],
            'ap_paterno' =>$data['ap_paterno'],
            'ap_materno' => $data['ap_materno'],
            'fecha'=> $data['fecha'],
            'estado' => $data['estado']
        ]);

        DB::table('declaracion')->insert([
            'id' => $data['id'],
            'year' => $data['year'],
            'correo' => $data['correo'],
            'telefono' => $data['telefono'],
            'direccion' => $data['direccion'],
            'region' => $data['region'],
            'comuna' => $data['comuna'],
            'ciudad' => $data['ciudad'],
            'estado_civil' => $data['estado_civil'],
            'afp' => $data['afp'], 
            'trabajo' => $data['trabajo'],
            'tel_trabajo' => $data['tel_trabajo']
        ]);

        $response = ['mensaje' => 'La declaracion se ha registrado exitosamente'];
        return response($response, 200);
    }

    public function actualizar_datos_personales(Request $request){
        $data = $request->validate([
            'id' => 'required',
            'rut_deudor' => 'required',
            'nombres' => 'required',
            'ap_paterno' => 'required',
            'ap_materno' => 'required',
            'fecha' => 'required',
            'correo' => 'nullable',
            'telefono' => 'nullable',
            'direccion' => 'nullable',
            'region' => 'nullable',
            'comuna' => 'nullable',
            'ciudad' => 'nullable',
            'estado_civil' => 'required',
            'afp' => 'required', 
            'trabajo' => 'nullable',
            'tel_trabajo' => 'nullable'
        ]);

        DB::table('tramite')->where('id', $data['id'])
            ->update(['fecha' => $data['fecha']]);

        DB::table('declaracion')->where('id', $data['id'])
            ->update(
                ['correo' => $data['correo'],
                'telefono' => $data['telefono'],
                'direccion' => $data['direccion'],
                'region' => $data['region'],
                'comuna'=> $data['comuna'],
                'ciudad'=> $data['ciudad'],
                'estado_civil'=> $data['estado_civil'],
                'afp'=> $data['afp'],
                'trabajo'=> $data['trabajo'],
                'tel_trabajo'=> $data['tel_trabajo']
            ]);

        $response = ['mensaje' => 'Los datos de la declaracion se han actualizado correctamente'];
        return response($response, 200);
    }

    public function datos_declaracion(Request $request, $rut_deudor, $id_declaracion)
    {
        /*
        $funcionario = DB::table('funcionario')->where('rut', '=', $data['rut'])->first();
        */
        $declaracion = DB::table('declaracion')->join('tramite', 'tramite.id', '=', 'declaracion.id')->where('declaracion.id', '=', $id_declaracion)->select('tramite.*','declaracion.*')->first();
        return response()->json($declaracion);
    }


    public function actualizar_ingresos(Request $request, $rut_deudor, $id_declaracion)
    {
        $data = $request->validate([
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
            'diciembre_utm' => 'required',
            'ingreso_total_deudor' => 'required',
            'ingreso_total_deudor_utm' => 'required',
            'ingreso_total_conyuge' => 'required',
            'ingreso_total_conyuge_utm' => 'required',
            'cuota_preliminar' => 'required'
        ]);

        DB::table('declaracion')->where('id', $id_declaracion)
            ->update(
                ['enero'=> $data['enero'],
                'febrero'=> $data['febrero'],
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
                'enero_utm' => $data['enero_utm'],
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
                'diciembre_utm' => $data['diciembre_utm'],
                'ingreso_total_deudor' => $data['ingreso_total_deudor'],
                'ingreso_total_deudor_utm' => $data['ingreso_total_deudor_utm'],
                'ingreso_total_conyuge' => $data['ingreso_total_conyuge'],
                'ingreso_total_conyuge_utm' => $data['ingreso_total_conyuge_utm'],
                'cuota_preliminar' => $data['cuota_preliminar'],
            ]);

        $response = ['mensaje' => 'Los ingresos de la declaracion se han actualizado correctamente'];
        return response($response, 200);
    }

    public function generarPdfDeclaracion(Request $request, $rut_deudor, $id_declaracion){
        $year = date('Y')-1;

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
            'declaracion'=>(array)$declaracion,
            'conyuge'=>(array)$conyuge,
            'utm'=>(array)$utm
        ];

        $tipo_documento = 'PDF_DECLARACION';
        $nombre_documento = 'DECLARACION JURADA DE INGRESOS';
        $ubicacion_documento = 'declaraciones/'.$rut_deudor.'/'.$id_declaracion.'/documentacion/'.$nombre_documento.'.pdf';

        $existe = Storage::disk('public')->exists($ubicacion_documento);

        if($existe == false){
            /*
                Genera el documento en formato pdf y lo almacena en el storage del servidor.
            */
            $pdf = PDF::loadView('declaracion', $data)->setPaper('legal', 'portrait');
            Storage::disk('public')->put($ubicacion_documento, $pdf->output());

            DB::table('documento')->insert([
                'nombre'=>$nombre_documento,
                'tipo' => $tipo_documento,
                'ubicacion' => $ubicacion_documento,
                'ref_declaracion' => $id_declaracion
            ]);

            $response = ['mensaje' => 'Se ha generado el pdf de la declaración para firmar'];
            return response($response, 200);
        }

        $pdf = PDF::loadView('declaracion', $data)->setPaper('legal', 'portrait');
        Storage::disk('public')->put($ubicacion_documento, $pdf->output());

        $response = ['mensaje' => 'Se ha generado el pdf de la declaración para firmar'];
        return response($response, 200);
    }

    public function obtenerDeclaracionesEnRevision(Request $request, $rut_funcionario)
    {
        $declaraciones = DB::table('declaracion')
        ->join('tramite', 'tramite.id', '=', 'declaracion.id')
        ->join('revision', 'revision.ref_tramite', '=', 'tramite.id')
        ->where('tramite.estado', '=', 3)
        ->where('revision.estado', '=', 'EN REVISION')
        ->select('tramite.*','declaracion.*')
        ->get();
        
        return response()->json($declaraciones);
    }

    public function obtenerDeclaracionesSegunEstado(Request $request, $estado)
    {
        $declaraciones = DB::table('declaracion')->join('tramite', 'tramite.id', '=', 'declaracion.id')->where('tramite.estado', '=', $estado)->select('tramite.*','declaracion.*')->get();
        
        return response()->json($declaraciones);
    }

    public function actualizar_estado(Request $request, $rut_deudor, $id_declaracion)
    {
        $data = $request->validate([
            'estado'=> 'required'
        ]);

        DB::table('tramite')->where('id', $id_declaracion)->update(['estado'=> $data['estado']]);

        $response = ['mensaje' => 'El estado de la declaración se ha actualizado correctamente'];
        return response($response, 200);
    }

    public function obtenerEstadoDeclaracion(Request $request, $rut_deudor, $year)
    {
        $declaracion = DB::table('declaracion')
        ->join('tramite', 'tramite.id', '=', 'declaracion.id')
        ->where('tramite.rut_deudor', '=', $rut_deudor)
        ->where('declaracion.year', '=', $year)
        ->select('tramite.id', 'tramite.estado')
        ->first();
        
        if($declaracion != null){
            $response = ['id_declaracion' => $declaracion->id, 
            'estado' => $declaracion->estado];

            return response($response, 200);
        }
        else{
            $response = ['id_declaracion' => '', 
            'estado' => 0];

            return response($response, 200);
        }
    }

    public function verificarDisponibilidadPdf(Request $request, $rut_deudor, $id_declaracion)
    {
        $tipo_documento = 'PDF_DECLARACION';
        $nombre_documento = 'DECLARACION JURADA DE INGRESOS';
        $ubicacion_documento = 'declaraciones/'.$rut_deudor.'/'.$id_declaracion.'/documentacion/'.$nombre_documento.'.pdf';

        $existe = Storage::disk('public')->exists($ubicacion_documento);
        $response = ['pdf_disponible' => $existe];
        return response($response, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Declaracion  $declaracion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Declaracion $declaracion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Declaracion  $declaracion
     * @return \Illuminate\Http\Response
     */
    public function destroy(Declaracion $declaracion)
    {
        //
    }
}
