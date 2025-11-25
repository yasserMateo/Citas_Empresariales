import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { Roles } from '../../../models/roles.model';
import { RolesService } from '../../../services/roles.service';

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
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.scss'
})
export class UsuarioFormComponent implements OnInit {
  form: FormGroup;
  roles: Roles[] = [];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private rolesService: RolesService,
    private dialogRef: MatDialogRef<UsuarioFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario | null
  ) {
    this.form = this.fb.group({
      idUsuario: [data?.idUsuario ?? null],
      idEmpleado: [data?.idEmpleado ?? null, [Validators.required]],
      nombre: [data?.nombre ?? '', [Validators.required, Validators.maxLength(100)]],
      nombreUsuario: [data?.nombreUsuario ?? '', [Validators.required, Validators.maxLength(50)]],
      contrasena: [data?.contrasena ?? '', [Validators.required, Validators.maxLength(100)]],

  

      ultimoCambioDeContrasena: [
        data?.ultimoCambioDeContrasena
          ? new Date(data.ultimoCambioDeContrasena)
          : null
      ],

      idRol: [data?.idRol ?? null, [Validators.required]],
      activacion: [data?.activacion ?? true, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.cargarRoles();
  }

  private cargarRoles(): void {
    this.rolesService.getRoles().subscribe({
      next: (data) => (this.roles = data),
      error: (err) => console.error(err)
    });
  }

  guardar(): void {
    const formValue = this.form.value;

    let usuario: Usuario;

    if (this.data && this.data.idUsuario != null) {

      usuario = {
        ...this.data,
        ...formValue,
        fechaDeCreacion: this.data.fechaDeCreacion
      };
    } else {
      
      usuario = {
        ...formValue,
        idUsuario: 0,                 
        fechaDeCreacion: new Date()
      } as Usuario;
    }

    if (usuario.idUsuario != null && this.data) {
      this.usuarioService.updateUsuario(usuario.idUsuario, usuario).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error(err)
      });
    } else {
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
