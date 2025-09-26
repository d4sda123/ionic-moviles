<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\UsuarioController;

// Clientes endpoints
Route::get('/listado', [ClienteController::class, 'index']);
Route::post('/clientes', [ClienteController::class, 'store']);
Route::put('/clientes/{id}', [ClienteController::class, 'update']);
Route::delete('/clientes/{id}', [ClienteController::class, 'destroy']);

// Login endpoints
Route::post('/login/email', [UsuarioController::class, 'verificaEmail']);
Route::post('/login/password', [UsuarioController::class, 'verificaClave']);