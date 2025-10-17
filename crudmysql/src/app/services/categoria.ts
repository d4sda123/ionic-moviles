import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Categoria {
  categoria_id: number;
  descripcion: string;
  estado: number;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private base = 'http://localhost:8000/api/categorias';

  constructor(private http: HttpClient) {}

  ObtenerTodos(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.base);
  }
}
