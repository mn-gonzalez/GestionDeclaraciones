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

    protected $fillable = ['rut', 'nombres', 'ap_paterno', 'ap_materno', 'correo', 'telefono', 
    'contrasena', 'ciudad', 'comuna', 'region', 'direccion'];

    protected $primaryKey = 'rut';
}
