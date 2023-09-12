<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Conyuge extends Model
{
    use HasFactory;

    protected $table = 'conyuge';

    protected $fillable = [
        'id',
        'rut',
        'nombres',
        'ap_paterno',
        'ap_materno',
        'ref_declaracion',
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
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
        'cuota_preliminar',
        'created_at',
        'updated_at'
    ];

    public function tramite(): BelongsTo
    {
        return $this->BelongsTo('App\Models\Declaracion', 'ref_declaracion', 'id');
    }
}
