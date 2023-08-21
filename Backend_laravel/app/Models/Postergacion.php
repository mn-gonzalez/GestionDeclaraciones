<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Postergacion extends Model
{
    use HasFactory;

    protected $table = 'postergacion';

    protected $fillable = [
        'motivo',
        'archivo' 
    ];
}
