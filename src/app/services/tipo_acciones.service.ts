import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TipoAcciones } from '../models/tipo_acciones.model';

@Injectable({
  providedIn: 'root'
})
export class TipoAccionesService {
  urlObjetivo: string = `${environment.apiUrl}/Tipo_Accion`;

  constructor(private httpClient: HttpClient) { }

  getTipoAcciones(): Observable<TipoAcciones[]> {
    return this.httpClient.get<TipoAcciones[]>(this.urlObjetivo);
  }

  getTipoAccion(id: number): Observable<TipoAcciones> {
    return this.httpClient.get<TipoAcciones>(`${this.urlObjetivo}/${id}`);
  }

  createTipoAccion(nuevaAccion: TipoAcciones): Observable<any> {
    return this.httpClient.post<TipoAcciones>(this.urlObjetivo, nuevaAccion);
  }

  updateTipoAccion(id: number, accionActualizada: TipoAcciones): Observable<any> {
    return this.httpClient.put<TipoAcciones>(`${this.urlObjetivo}/${id}`, accionActualizada);
  }

  deleteTipoAccion(id: number): Observable<any> {
    return this.httpClient.delete<TipoAcciones>(`${this.urlObjetivo}/${id}`);
  }
}
