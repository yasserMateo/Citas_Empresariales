import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { SolicitudesVarias } from '../models/solicitudes_varias.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesVariasService {
  private urlObjetivo = `${environment.apiUrl}/Solicitudes_Varias`;

  constructor(private httpClient: HttpClient) {}

  getSolicitudesVarias(): Observable<SolicitudesVarias[]> {
    return this.httpClient.get<SolicitudesVarias[]>(this.urlObjetivo);
  }

  getSolicitudVaria(id: number): Observable<SolicitudesVarias> {
    return this.httpClient.get<SolicitudesVarias>(`${this.urlObjetivo}/${id}`);
  }

  createSolicitudVaria(nueva: SolicitudesVarias): Observable<any> {
    return this.httpClient.post<any>(this.urlObjetivo, nueva);
  }

  updateSolicitudVaria(id: number, actualizada: SolicitudesVarias): Observable<any> {
    return this.httpClient.put<any>(`${this.urlObjetivo}/${id}`, actualizada);
  }

  deleteSolicitudVaria(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.urlObjetivo}/${id}`);
  }
}
