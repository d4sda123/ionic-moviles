<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categoria;

class CategoriaController extends Controller
{
    public function index()
    {
        $ListaCategoria=Categoria::where('estado','=','1')->get();
        return response()->json($ListaCategoria);
    }
}
