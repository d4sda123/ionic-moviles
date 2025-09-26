import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private url = "http://localhost:8000/api/login";
  
  constructor(private http: HttpClient) {}

  public verificarEmail(email: string) {
    return this.http.get<any>(this.url + `/` + email);
  }

  public verificarClave(email: string, password: string) {
    return this.http.get<any>(this.url + `/` + email + `/` + password);
  }
}
