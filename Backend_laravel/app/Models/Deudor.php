<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deudor extends Model
{
    use HasFactory;

    protected $fillable = ['correo', 'telefono', 'contrasena', 'ciudad', 'comuna', 'region', 'direccion'];
}
