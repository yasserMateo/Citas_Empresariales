import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/clientes.model';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  urlObjetivo: string = `${environment.apiUrl}/Clientes`

  constructor(private httpClient: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.urlObjetivo)
  }
  getCliente(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.urlObjetivo}/${id}`)
  }
  createCliente(nuevoCliente: Cliente): Observable<any> {
    return this.httpClient.post<Cliente>(this.urlObjetivo, nuevoCliente)
  }
  updateCliente(id: number, clienteActualizado: Cliente): Observable<any> {
    return this.httpClient.put<Cliente>(`${this.urlObjetivo}/${id}`, clienteActualizado)
  }
  deleteCliente(id: number): Observable<any> {
    return this.httpClient.delete<Cliente>(`${this.urlObjetivo}/${id}`)
  }
}
