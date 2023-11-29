<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use App\Mail\CorreoContrasena;

class SendPasswordRecovery implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $detalles;
    public $timeout = 300; //5 minutos

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($detalles)
    {
        $this->detalles = $detalles;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $deudor = $this->detalles['deudor'];
        $correo = $this->detalles['correo'];
        $subject = $this->detalles['subject'];
        $mensaje = $this->detalles['mensaje'];
        $enlace = $this->detalles['enlace'];
        $datos = [
            "deudor" => $deudor,
            "subject" => $subject,
            "mensaje" => $mensaje,
            "enlace" => $enlace
        ];

        if (isset($correo) == true) {
            Mail::to($correo)->send(new CorreoContrasena($datos));
        }
    }
}