import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private base = "http://localhost:8000/api";
  
  constructor(private http: HttpClient) {}
  
  public verificarEmail(email: string) {
    return this.http.post<any>(`${this.base}/login/email`, { email });
  }

  public verificarClave(email: string, password: string) {
    return this.http.post<any>(`${this.base}/login/password`, { email, password });
  }

  public registrar(email: string, password: string) {
    return this.http.post<any>(`${this.base}/register`, { email, password });
  }
}
