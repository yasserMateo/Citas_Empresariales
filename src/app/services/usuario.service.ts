import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlObjetivo = `${environment.apiUrl}/Usuarios`;

  constructor(private httpClient: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.urlObjetivo);
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.urlObjetivo}/${id}`);
  }

  createUsuario(nuevo: Usuario): Observable<any> {
    return this.httpClient.post<any>(this.urlObjetivo, nuevo);
  }

  updateUsuario(id: number, actualizado: Usuario): Observable<any> {
    return this.httpClient.put<any>(`${this.urlObjetivo}/${id}`, actualizado);
  }

  deleteUsuario(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.urlObjetivo}/${id}`);
  }
}
