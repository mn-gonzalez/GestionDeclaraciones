<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Devolucion extends Model
{
    use HasFactory;

    protected $table = 'devolucion';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'correo',
        'telefono',
        'tipo_deuda',
        'retiro_oficina',
        'domicilio',
        'solicitud',
        'observaciones',
        'nombre_archivo',
        'archivo',
        'created_at',
        'updated_at'
    ];

    public function tramite(): HasOne
    {
        return $this->hasOne('App\Models\Tramite', 'id', 'id');
    }
}
