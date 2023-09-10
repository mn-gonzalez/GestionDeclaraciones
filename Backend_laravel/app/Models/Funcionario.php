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
    protected $primaryKey = 'rut';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'rut', 
        'nombres', 
        'ap_paterno', 
        'ap_materno', 
        'correo', 
        'tipo_usuario',
        'created_at',
        'updated_at'
    ];
}
