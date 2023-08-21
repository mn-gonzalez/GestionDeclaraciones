<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Funcionario extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'funcionario';

    protected $fillable = ['rut', 'nombres', 'ap_paterno', 'ap_materno', 'correo', 
    'contrasena', 'tipo_usuario'];

    protected $primaryKey = 'rut';
}
