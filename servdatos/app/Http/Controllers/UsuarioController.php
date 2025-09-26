<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use DB;
use Exception;

class UsuarioController extends Controller
{
    public static function verificaEmail($email)
    {
        try {
            $usuario = Usuario::select('id', 'email')->where('email', '=', $email)
                ->where('estado', '=', 1)
                ->first;

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

    public static function verificaClave($email, $password)
    {
        $usuario = '';
        try {
            $usuario = Usuario::select('id', 'email')
                ->where('email', '=', $email)
                ->where('password', '=', $password)
                ->where('estado', '=', 1)
                ->first();

            if ($usuario == null) {
                return response()->json([
                    "status" => 400,
                    "data" => $usuario,
                    "Login" => false
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
