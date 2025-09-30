<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;
use Exception;

class ProductoController extends Controller
{
    public function index()
    {
        return Producto::all();
    }

    public function store(Request $request)
    {
        try {
            $producto = new Producto();
            $producto->nombre = $request->nombre;
            $producto->descripcion = $request->descripcion;
            $producto->precio = $request->precio;
            $producto->stock = $request->stock;
            $producto->estado = $request->estado ?? 1;
            $producto->save();

            return [
                'producto_id' => $producto->producto_id,
                'nombre' => $producto->nombre,
                'descripcion' => $producto->descripcion,
                'precio' => $producto->precio,
                'stock' => $producto->stock,
                'estado' => $producto->estado,
                'created' => true,
            ];
        } catch (Exception $e) {
            return response()->json(['error' => 'Error fatal - ' . $e->getMessage()], 500);
        }
    }

    public function show(string $id)
    {
        return Producto::find($id);
    }

    public function update(Request $request, string $id)
    {
        $producto = Producto::findOrFail($id);
        $producto->update($request->all());
        return $producto;
    }

    public function destroy(string $id)
    {
        $producto = Producto::findOrFail($id);
        $producto->delete();
        return response()->noContent();
    }
}
