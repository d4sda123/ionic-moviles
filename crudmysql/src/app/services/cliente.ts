import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Cliente {
  cliente_id: number;
  ruc_dni: string;
  nombres: string;
  email: string;
  direccion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private url = 'http://localhost:8000/listado';
  private url2 = 'http://localhost:8000/api/clientes';
  private url3 = 'http://localhost:8000/api/clientes/{id}';

  constructor(private http: HttpClient) { }


  obtenerTodos(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url);
  }

  Obtener(cliente_id: number) {
    return this.http.get<[Cliente]>(this.url2 + '/' + cliente_id);
  }

  Agregar(cliente: Cliente) {
    return this.http.post(this.url2, cliente);
  }

  Actualizar(cliente: Cliente, cliente_id: number): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.url2}/${cliente_id}`, cliente);
  }

  Borrar(cliente_id: number) {
    return this.http.delete(`${this.url2}/${cliente_id}`);
  }

}
