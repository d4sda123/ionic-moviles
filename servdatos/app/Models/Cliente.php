<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cliente extends Model
{
    protected $table = 'clientes';
    protected $primaryKey = 'cliente_id';
    public $timestamps = false;

    protected $fillable = [
        'cliente_id', 'ruc_dni','nombres','email','direccion', 'estado'
    ];    
}
