import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RolesService } from '../../../services/roles.service';
import { Roles } from '../../../models/roles.model';

@Component({
  selector: 'app-rol-form',
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
  templateUrl: './roles-form.component.html',
  styleUrl: './roles-form.component.scss'
})
export class RolFormComponent {
  rolForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private rolesService: RolesService,
    private dialogRef: MatDialogRef<RolFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Roles
  ) {
    this.rolForm = this.fb.group({
      idRol: [data?.idRol || 0],
      rolNombre: [data?.rolNombre || '', Validators.required],
      descripcion: [data?.descripcion ?? null],
      activacion: [data?.activacion ?? true, Validators.required]
    });
  }

  guardar() {
    const rol: Roles = this.rolForm.value;

    // Si tiene idRol distinto de 0, asumimos que es edición
    if (rol.idRol && rol.idRol !== 0) {
      this.rolesService.updateRol(rol.idRol, rol).subscribe({
        next: () => console.log('Rol actualizado'),
        error: (err) => console.error(err)
      });
    } else {
      this.rolesService.createRol(rol).subscribe({
        next: () => console.log('Rol creado'),
        error: (err) => console.error(err)
      });
    }

    this.dialogRef.close(true);
  }

  cerrar() {
    this.dialogRef.close(false);
  }
}
