<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Postergacion extends Tramite
{
    use HasFactory;

    protected $table = 'postergacion';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'motivo',
        'nombre_archivo',
        'archivo',
        'created_at',
        'updated_at'
    ];

    public function tramite(): HasOne
    {
        return $this->hasOne('App\Models\Tramite', 'id', 'id');
    }
}
