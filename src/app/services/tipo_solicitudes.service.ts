import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TipoSolicitudes } from '../models/tipo_solicitudes.model';

@Injectable({
  providedIn: 'root'
})
export class TipoSolicitudesService {
  urlObjetivo: string = `${environment.apiUrl}/Tipos_Solicitudes`;

  constructor(private httpClient: HttpClient) {}

  getTipoSolicitudes(): Observable<TipoSolicitudes[]> {
    return this.httpClient.get<TipoSolicitudes[]>(this.urlObjetivo);
  }

  getTipoSolicitud(id: number): Observable<TipoSolicitudes> {
    return this.httpClient.get<TipoSolicitudes>(`${this.urlObjetivo}/${id}`);
  }

  createTipoSolicitud(nueva: TipoSolicitudes): Observable<any> {
    return this.httpClient.post<TipoSolicitudes>(this.urlObjetivo, nueva);
  }

  updateTipoSolicitud(id: number, actualizada: TipoSolicitudes): Observable<any> {
    return this.httpClient.put<TipoSolicitudes>(`${this.urlObjetivo}/${id}`, actualizada);
  }

  deleteTipoSolicitud(id: number): Observable<any> {
    return this.httpClient.delete<TipoSolicitudes>(`${this.urlObjetivo}/${id}`);
  }
}
