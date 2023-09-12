<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tramite extends Model
{
    use HasFactory;

    protected $table = 'tramite';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'rut_deudor',
        'nombres',
        'ap_paterno',
        'ap_materno',
        'fecha',
        'estado',
        'created_at',
        'updated_at'
    ];

    public function deudor(): BelongsTo
    {
        return $this->BelongsTo('App\Models\Deudor', 'rut_deudor', 'rut');
    }
}
