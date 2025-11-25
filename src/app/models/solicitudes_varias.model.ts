export interface SolicitudesVarias {
  idSolicitudVaria: number;
  idTipoSolicitud: number;
  idEmpleado: number;
  idTipoSolicitudVaria: number;
  monto: number;
  fechaEfectividad: Date; 
  garante: string | null;
  noResolucion: Date | null;
  fecha: Date; 
}
