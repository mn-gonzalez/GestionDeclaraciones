<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Declaracion extends Tramite
{
    use HasFactory;

    protected $table = 'declaracion';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'rut_deudor',
        'nombres',
        'ap_paterno',
        'ap_materno',
        'fecha' => 'datetime:Y/m/d',
        'estado', 
        'year',
        'correo',
        'telefono',
        'region',
        'comuna',
        'ciudad',
        'estado_civil',
        'afp', 
        'trabajo',
        'tel_trabajo',
        'declaracion_sii',
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

    public function tramite(): HasOne
    {
        return $this->HasOne('App\Models\Tramite', 'id', 'id');
    }

    public function documentacion(): HasMany
    {
        return $this->HasMany('App\Models\Documento', 'ref_declaracion', 'id');
    }

    public function utm(): HasOne
    {
        return $this->HasOne('App\Models\Utm', 'year', 'year');
    }
}
