<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\CategoriaController;

// Clientes endpoints
Route::get('/listado', [ClienteController::class, 'index']);
Route::post('/clientes', [ClienteController::class, 'store']);
Route::put('/clientes/{id}', [ClienteController::class, 'update']);
Route::delete('/clientes/{id}', [ClienteController::class, 'destroy']);

// Login endpoints
Route::post('/login/email', [UsuarioController::class, 'verificaEmail']);
Route::post('/login/password', [UsuarioController::class, 'verificaClave']);

// Registro de usuarios
Route::post('/register', [UsuarioController::class, 'registrar']);

// Productos endpoints
Route::get('/productos', [ProductoController::class, 'index']);
Route::post('/productos', [ProductoController::class, 'store']);
Route::put('/productos/{id}', [ProductoController::class, 'update']);
Route::delete('/productos/{id}', [ProductoController::class, 'destroy']);

Route::get('/categorias', [CategoriaController::class, 'index']);