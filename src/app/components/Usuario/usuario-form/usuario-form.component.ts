import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';

import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,

    // NECESARIOS PARA MAT-DATEPICKER
    MatDatepickerModule,
    MatNativeDateModule,

    // NECESARIO PARA mat-checkbox
    MatCheckboxModule,

    // NECESARIO PARA EL ÍCONO DEL DATEPICKER
    MatIconModule
  ],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})
export class UsuarioFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<UsuarioFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario | null
  ) {
    this.form = this.fb.group({
      idUsuario: [data?.idUsuario ?? null],
      idEmpleado: [data?.idEmpleado ?? null, [Validators.required]],
      nombre: [data?.nombre ?? '', [Validators.required, Validators.maxLength(100)]],
      nombreUsuario: [data?.nombreUsuario ?? '', [Validators.required, Validators.maxLength(50)]],
      contrasena: [data?.contrasena ?? '', [Validators.required, Validators.maxLength(100)]],

      fechaDeCreacion: [
        data?.fechaDeCreacion ? new Date(data.fechaDeCreacion) : new Date(),
        [Validators.required]
      ],

      ultimoCambioDeContrasena: [
        data?.ultimoCambioDeContrasena ? new Date(data.ultimoCambioDeContrasena) : null
      ],

      idRol: [data?.idRol ?? null, [Validators.required]],
      activacion: [data?.activacion ?? true, [Validators.required]]
    });
  }

  guardar(): void {
    const usuario: Usuario = this.form.value;

    if (usuario.idUsuario != null) {
      // Editar
      this.usuarioService.updateUsuario(usuario.idUsuario, usuario).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error(err)
      });
    } else {
      // Crear
      this.usuarioService.createUsuario(usuario).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error(err)
      });
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
