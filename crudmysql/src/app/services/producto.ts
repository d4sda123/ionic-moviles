import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../services/categoria'

export interface Producto {
  producto_id: number;
  categoria: Categoria;
  categoria_id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  estado: number; // 1 activo, 0 inactivo
}

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private base = 'http://localhost:8000/api/productos';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.base);
  }

  obtener(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.base}/${id}`);
  }

  Agregar(prod: Omit<Producto, 'producto_id'>) {
    return this.http.post<Producto>(this.base, prod);
  }

  Actualizar(prod: Partial<Producto>, id: number) {
    return this.http.put<Producto>(`${this.base}/${id}`, prod);
  }

  Borrar(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }
}
