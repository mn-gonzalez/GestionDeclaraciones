<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Utm extends Model
{
    use HasFactory;

    protected $table = 'utm';
    protected $primaryKey = 'year';
    public $incrementing = false;

    protected $fillable = [
        'year', 
        'enero', 
        'febrero', 
        'marzo', 
        'abril', 
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
        'created_at',
        'updated_at'
    ];
}
