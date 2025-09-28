<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use DB;
use Exception;

class UsuarioController extends Controller
{
    public function verificaEmail(Request $request)
    {
        \Log::info('Datos recibidos en verificaClave:', $request->all());
        try {
            $usuario = Usuario::select('id', 'email')
                ->where('email', '=', $request->email)
                ->where('estado', '=', 1)
                ->first();

            if ($usuario == null) {
                return response()->json([
                    "status" => 400,
                    "data" => $usuario,
                    "login" => false
                ]);
            } else {
                return response()->json([
                    "status" => 200,
                    "data" => $usuario,
                    "login" => true
                ]);
            }
        } catch (Exception $e) {
            return response()->json([
                "status" => 500,
                "error" => "Error: " . $e->getMessage()
            ]);
        }
    }

    public function verificaClave(Request $request)
    {
        try {
            $usuario = Usuario::select('id', 'email')
                ->where('email', '=', $request->email)
                ->where('password', '=', $request->password)
                ->where('estado', '=', 1)
                ->first();

            if ($usuario == null) {
                return response()->json([
                    "status" => 400,
                    "data" => $usuario,
                    "login" => false
                ]);
            } else {
                return response()->json([
                    "status" => 200,
                    "data" => $usuario,
                    "login" => true
                ]);
            }
        } catch (Exception $e) {
            return response()->json([
                "status" => 500,
                "error" => "Error: " . $e->getMessage()
            ]);
        }
    }

}
