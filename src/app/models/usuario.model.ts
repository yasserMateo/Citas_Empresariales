export interface Usuario {
  idUsuario: number;
  idEmpleado: number;
  nombre: string;
  nombreUsuario: string;
  contrasena: string;
  fechaDeCreacion: Date;
  ultimoCambioDeContrasena: Date | null;
  idRol: number;
  activacion: boolean;
}
