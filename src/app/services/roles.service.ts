import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Roles } from '../models/roles.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private urlObjetivo = `${environment.apiUrl}/Roles`;

  constructor(private httpClient: HttpClient) {}

  getRoles(): Observable<Roles[]> {
    return this.httpClient.get<Roles[]>(this.urlObjetivo);
  }

  getRol(id: number): Observable<Roles> {
    return this.httpClient.get<Roles>(`${this.urlObjetivo}/${id}`);
  }

  createRol(nuevo: Roles): Observable<any> {
    return this.httpClient.post<any>(this.urlObjetivo, nuevo);
  }

  updateRol(id: number, actualizado: Roles): Observable<any> {
    return this.httpClient.put<any>(`${this.urlObjetivo}/${id}`, actualizado);
  }

  deleteRol(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.urlObjetivo}/${id}`);
  }
}
