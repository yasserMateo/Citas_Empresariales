import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Parentesco } from '../models/parentesco.model';

@Injectable({
  providedIn: 'root'
})
export class ParentescoService {
  private urlObjetivo = `${environment.apiUrl}/Parentescoes`;

  constructor(private httpClient: HttpClient) {}

  getParentescos(): Observable<Parentesco[]> {
    return this.httpClient.get<Parentesco[]>(this.urlObjetivo);
  }

  getParentesco(id: number): Observable<Parentesco> {
    return this.httpClient.get<Parentesco>(`${this.urlObjetivo}/${id}`);
  }

  createParentesco(nuevo: Parentesco): Observable<any> {
    return this.httpClient.post<any>(this.urlObjetivo, nuevo);
  }

  updateParentesco(id: number, actualizado: Parentesco): Observable<any> {
    return this.httpClient.put<any>(`${this.urlObjetivo}/${id}`, actualizado);
  }

  deleteParentesco(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.urlObjetivo}/${id}`);
  }
}
