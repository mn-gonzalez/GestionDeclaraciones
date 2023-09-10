<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Deudor extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

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

    protected $hidden = ['contrasena', 'created_at', 'updated_at'];
}
