<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tramite extends Model
{
    use HasFactory;

    protected $table = 'tramite';

    protected $fillable = ['nombres', 'ap_paterno', 'ap_materno', 'fecha', 'estado'];
}
