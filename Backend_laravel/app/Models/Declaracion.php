<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Declaracion extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'rut_deudor',
        'nombres',
        'ap_paterno',
        'ap_materno',
        'fecha' => 'datetime:d/m/Y',
        'estado', 
        'anio',
        'correo',
        'telefono',
        'region',
        'comuna',
        'ciudad',
        'estado_civil',
        'afp', 
        'trabajo',
        'tel_trabajo',
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio'.
        'julio',
        'agosto',
        'septiembre',
        'octubre', 
        'noviembre',
        'diciembre',
        'enero_utm',
        'febrero_utm',
        'marzo_utm',
        'abril_utm',
        'mayo_utm',
        'junio_utm',
        'julio_utm',
        'agosto_utm',
        'septiembre_utm',
        'octubre_utm',
        'noviembre_utm',
        'diciembre_utm',
        'ingreso_total_deudor',
        'ingreso_total_deudor_utm',
        'ingreso_total_conyuge',
        'ingreso_total_conyuge_utm',
        'cuota_preliminar'
    ];
}
