<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cliente; 

class ClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return cliente::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try{
            $cliente=new Cliente();
            $cliente->nombres=$request->nombres;
            $cliente->ruc_dni=$request->ruc_dni;
            $cliente->direccion=$request->direccion;
            $cliente->email=$request->email;            
            $cliente->estado=1; 
            $cliente->save();   
            $result=[                
                'nombres'=>$cliente->nombres,
                'ruc_dni'=>$request->ruc_dni,
                'direccion'=>$cliente->direccion,
                'email'=>$request->email,           
                'cliente_id'=>$cliente->cliente_id,         
                'created' => true
            ];
            return $result;
        }
        catch(Exception $e){
            return "Error fatal - ".$e->getMessage();
        }     

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return cliente::find($id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $cliente=Cliente::findOrFail($id);
        $cliente->update($request->all());
        return $cliente;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $cliente = Cliente::findOrFail($id);
        $cliente->delete();

        return response()->noContent(); 
    }

    public function delete($id)
    {
        $cliente=Cliente::findOrFail($id);
        $cliente->delete();
        return 204;
    }

    public function Listado(Request $request)
    {        
        $ListaCliente=Cliente::all();
        return response()->json($ListaCliente);
    }
}
