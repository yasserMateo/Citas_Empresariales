import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TipoSolicitudesVarias } from '../models/tipo_solicitudesVarias.model';

@Injectable({
  providedIn: 'root'
})
export class TipoSolicitudesVariasService {
  private urlObjetivo = `${environment.apiUrl}/Tipos_Solicitudes_Varias`;

  constructor(private httpClient: HttpClient) {}

  getTiposSolicitudesVarias(): Observable<TipoSolicitudesVarias[]> {
    return this.httpClient.get<TipoSolicitudesVarias[]>(this.urlObjetivo);
  }

  getTipoSolicitudVaria(id: number): Observable<TipoSolicitudesVarias> {
    return this.httpClient.get<TipoSolicitudesVarias>(`${this.urlObjetivo}/${id}`);
  }

  createTipoSolicitudVaria(nuevo: TipoSolicitudesVarias): Observable<any> {
    return this.httpClient.post<any>(this.urlObjetivo, nuevo);
  }

  updateTipoSolicitudVaria(id: number, actualizado: TipoSolicitudesVarias): Observable<any> {
    return this.httpClient.put<any>(`${this.urlObjetivo}/${id}`, actualizado);
  }

  deleteTipoSolicitudVaria(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.urlObjetivo}/${id}`);
  }
}
