<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Revision extends Model
{
    use HasFactory;

    protected $table = 'revision';

    protected $fillable = [
        'id',
        'ref_tramite',
        'ref_funcionario',
        'fecha',
        'comentarios',
        'estado',
        'created_at',
        'updated_at'
    ];
    
    public function tramite(): HasOne
    {
        return $this->HasOne('App\Models\Tramite', 'ref_tramite', 'id');
    }

    public function funcionario(): HasOne
    {
        return $this->HasOne('App\Models\Persona', 'ref_funcionario', 'rut');
    }
}
