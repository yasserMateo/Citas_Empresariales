export interface Cliente {
    clienteId: number;
    nombreCliente: string;
    telefono: string;
    email: string;
    status: 'A' | 'I'; 
    citas: number;
    empresaId: number;
    empresa: number;
}
  