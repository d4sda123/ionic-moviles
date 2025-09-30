<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use DB;
use Exception;
use Illuminate\Support\Facades\Hash;

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
            $usuario = Usuario::where('email', '=', $request->email)
                ->where('estado', '=', 1)
                ->first();

            if ($usuario == null || !Hash::check($request->password, $usuario->password)) {
                return response()->json([
                    "status" => 400,
                    "data" => null,
                    "login" => false
                ]);
            } else {
                return response()->json([
                    "status" => 200,
                    "data" => [
                        'id' => $usuario->id,
                        'email' => $usuario->email,
                    ],
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

    public function registrar(Request $request)
    {
        try {
            $validated = $request->validate([
                'email' => 'required|email|unique:usuarios,email',
                'password' => 'required|min:6',
            ]);

            $usuario = Usuario::create([
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'estado' => 1,
            ]);

            return response()->json([
                "status" => 201,
                "data" => [
                    'id' => $usuario->id,
                    'email' => $usuario->email,
                ],
                "created" => true
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                "status" => 500,
                "error" => "Error: " . $e->getMessage()
            ]);
        }
    }

}

