<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Persona extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'persona';
    protected $primaryKey = 'rut';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'rut', 
        'nombres', 
        'ap_paterno', 
        'ap_materno', 
        'correo', 
        'contrasena',
        'created_at',
        'updated_at'
    ];

    protected $hidden = ['contrasena', 'created_at', 'updated_at'];

    public function getAuthIdentifier()
    {
        return $this->rut;
    }

    public function getAuthPassword()
    {
        return $this->contrasena;
    }

    public function getAuthIdentifierName()
    {
        return 'rut';
    }

    public function getKeyType()
    {
        return $this->keyType;
    }

    public function getIncrementing()
    {
        return $this->incrementing;
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier() 
    {
        return $this->getKey();
    }
    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims() 
    {
        return [];
    }  
}
