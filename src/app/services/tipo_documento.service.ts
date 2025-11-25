import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TipoDocumento } from '../models/tipo_documento.model';

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {
  private urlObjetivo = `${environment.apiUrl}/Tipo_Documentos`;

  constructor(private httpClient: HttpClient) {}

  getTiposDocumentos(): Observable<TipoDocumento[]> {
    return this.httpClient.get<TipoDocumento[]>(this.urlObjetivo);
  }

  getTipoDocumento(id: number): Observable<TipoDocumento> {
    return this.httpClient.get<TipoDocumento>(`${this.urlObjetivo}/${id}`);
  }

  createTipoDocumento(nuevo: TipoDocumento): Observable<any> {
    return this.httpClient.post<any>(this.urlObjetivo, nuevo);
  }

  updateTipoDocumento(id: number, actualizado: TipoDocumento): Observable<any> {
    return this.httpClient.put<any>(`${this.urlObjetivo}/${id}`, actualizado);
  }

  deleteTipoDocumento(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.urlObjetivo}/${id}`);
  }
}
