<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmailController extends Controller
{
    public function enviar_correo(Request $request)
    {
        $deudores = DB::table('persona')
            ->join('deudor', 'deudor.rut', '=', 'persona.rut')
            ->get();

        $detalles = [
            'subject' => 'Notificación declaraciones',
            'deudores' => $deudores
        ];

        $job = (new \App\Jobs\SendQueueEmail($detalles))
            ->delay(now()->addSeconds(2)); 

        dispatch($job);
        echo "Email enviado correctamente!!";
    }
}