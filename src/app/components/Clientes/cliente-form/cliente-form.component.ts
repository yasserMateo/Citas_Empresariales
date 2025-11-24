import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ClienteService } from '../../../services/cliente.service';
import { Cliente } from '../../../models/clientes.model';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.scss'
})
export class ClienteFormComponent {
  clienteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private dialogRef: MatDialogRef<ClienteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente
  ) {
    this.clienteForm = this.fb.group({
      clienteId: [data?.clienteId || null],
      nombreCliente: [data?.nombreCliente || '', Validators.required],
      telefono: [data?.telefono || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      status: [data?.status || 'A', Validators.required],
      empresaId: [data?.empresaId || null, Validators.required],
      empresa: [data?.empresa || null],
      citas: [data?.citas || 0]
    });
  }

  guardar() {
    const cliente: Cliente = this.clienteForm.value;

    if (cliente.clienteId !== null) {
      this.clienteService.updateCliente(cliente.clienteId, cliente).subscribe({
        next: () => console.log('Cliente actualizado'),
        error: (err) => console.error(err)
      });
    } else {
      this.clienteService.createCliente(cliente).subscribe({
        next: () => console.log('Cliente creado'),
        error: (err) => console.error(err)
      });
    }

    this.dialogRef.close();
  }

  cerrar() {
    this.dialogRef.close();
  }
}
