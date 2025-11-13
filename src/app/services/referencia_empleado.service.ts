
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { referencia_empleado } from '../models/referencia_empleado.model';

@Injectable({ providedIn: 'root' })
export class ReferenciaEmpleadoService {

  private urlObjetivo = `${environment.apiUrl}/Referencia_Empleado`;

  constructor(private http: HttpClient) {}

  getReferencias(): Observable<referencia_empleado[]> {
    return this.http.get<referencia_empleado[]>(this.urlObjetivo);
  }


  getReferencia(id: number): Observable<referencia_empleado> {
    return this.http.get<referencia_empleado>(`${this.urlObjetivo}/${id}`);
  }

  createReferencia(nuevo: referencia_empleado): Observable<referencia_empleado> {
    return this.http.post<referencia_empleado>(this.urlObjetivo, nuevo);
  }

  updateReferencia(id: number, actualizado: referencia_empleado): Observable<referencia_empleado> {
    return this.http.put<referencia_empleado>(`${this.urlObjetivo}/${id}`, actualizado);
  }

  deleteReferencia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlObjetivo}/${id}`);
  }

}
