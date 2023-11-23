<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use App\Mail\CorreoDeclaracion;

class SendQueueEmail implements ShouldQueue
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
        $input['subject'] = $this->detalles['subject'];
        $deudores = $this->detalles['deudores'];
        $datos = '';

        foreach ($deudores as $key => $deudor) {
            $correo = '';
            $nombre = $deudor->nombres;

            if (isset($deudor->correo) == true) {
                $correo = $deudor->correo;
            }

            Mail::to($correo)->send(new CorreoDeclaracion($datos));
        }
    }
}
