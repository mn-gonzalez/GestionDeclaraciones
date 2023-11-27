<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmailController extends Controller
{
    public static function enviar_notificacion($deudor, $datosCorreo){
        $nombreDeudor = $deudor->nombres.' '.$deudor->ap_paterno.' '.$deudor->ap_materno;

        $detalles = [
            'deudores' => [$deudor],
            'subject' => $datosCorreo["subject"],
            'mensaje' => $datosCorreo["mensaje"]
        ];

        $job = (new \App\Jobs\SendQueueEmail($detalles))
            ->delay(now()->addSeconds(2)); 

        dispatch($job);
    }

    public function enviar_correo_masivo(Request $request)
    {
        $tramite = isset($request->tramite) ? $request->tramite : null;
        $deudor_objetivo = isset($request->deudorObjetivo) ? $request->deudorObjetivo : null;

        $deudores = self::obtener_deudores($tramite, $deudor_objetivo);
        $subject = '';
        $mensaje = "";

        if ($tramite == "DECLARACION") {
            if ($deudor_objetivo == 1) {
                $subject = "Declaración sin entregar";
                $mensaje = "Según nuestro registros aún no has realizado el trámite online de la declaración jurada de ingresos.";
            } else if ($deudor_objetivo == 2) {
                $subject = "Declaración para corrección";
                $mensaje = "Te queremos indicar que tu declaración fue revisada y tiene detalles que debes corregir.";
            }
        }

        $detalles = [
            'deudores' => $deudores,
            'subject' => $subject,
            'mensaje' => $mensaje
        ];

        $job = (new \App\Jobs\SendQueueEmail($detalles))
            ->delay(now()->addSeconds(2)); 

        dispatch($job);
    }

    private function obtener_deudores($tramite, $deudor_objetivo){
        if ($tramite == "DECLARACION") {
            switch($deudor_objetivo){
                case 1:
                    return self::obtener_deudores_sin_declaracion();
                    break;
                case 2:
                    return self::deudores_declaracion_con_problemas();
                    break;
            }
        } else if ($tramite == "POSTERGACION") {

        } else if ($tramite == "DEVOLUCION") {

        }
    }

    private function obtener_deudores_sin_declaracion(){
        $deudores = [];
        $year = date('Y');

        $deudores = DB::select('SELECT persona.rut, 
            persona.nombres, 
            persona.ap_paterno, 
            persona.ap_materno,
            persona.correo
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

        return $deudores;
    }

    private function deudores_declaracion_con_problemas(){
        $deudores = [];
        $year = date('Y');

        $deudores = DB::table('tramite')
            ->join('declaracion', 'declaracion.id', '=', 'tramite.id')
            ->join('persona', 'persona.rut', '=', 'tramite.rut_deudor')
            ->where('tramite.estado', '=', 4)
            ->where('declaracion.year', '=', $year)
            ->select('persona.rut', 'persona.nombres', 'persona.ap_paterno', 'persona.ap_materno', 'persona.correo')
            ->get();

        return $deudores;
    }

    public static function enviar_recuperar_contrasena($correo, $token){
        $enlace = env('FRONT_URL').'/recuperarContrasena/'.$token;

        $detalles = [
            'correo' => $correo,
            'subject' => "Recuperar Contraseña",
            'mensaje' => 'Presiones en el siguiente enlace para recuperar su contraseña',
            'enlace' => $enlace
        ];

        $job = (new \App\Jobs\SendPasswordRecovery($detalles))
            ->delay(now()->addSeconds(2)); 
        
        dispatch($job);
    }
}