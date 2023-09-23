<?php

namespace App\Models;

use App\Models\Persona as Persona;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Deudor extends Persona
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;

    protected $table = 'deudor';
    protected $primaryKey = 'rut';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'rut',
        'nombres',
        'ap_paterno',
        'ap_materno',
        'correo',
        'telefono',
        'ciudad',
        'comuna',
        'region',
        'direccion',
        'inicio_cobro',
        'created_at',
        'updated_at'
    ];

    protected $hidden = [
        'contrasena',
        'created_at',
        'updated_at'
    ];

    /* public function tramites(): HasMany
    {
        return $this->hasMany('App\Models\Tramite');
    } */

    public function declaraciones(): HasMany
    {
        return $this->hasMany(Declaracion::class, 'rut_deudor', 'rut');
    }

    public function postergaciones(): HasMany
    {
        return $this->hasMany('App\Models\Postergacion', 'rut_deudor', 'rut');
    }

    public function devoluciones(): HasMany
    {
        return $this->hasMany('App\Models\Devolucion', 'rut_deudor', 'rut');
    }

    public function persona(): HasOne
    {
        return $this->hasOne('App\Models\Persona', 'rut', 'rut');
    }
    
}