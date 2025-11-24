import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { TipoSolicitudes } from '../../../models/tipo_solicitudes.model';
import { TipoSolicitudesService } from '../../../services/tipo_solicitudes.service';

@Component({
  selector: 'app-tipo-solicitudes-form',
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
  templateUrl: './tipo-solicitudes-form.component.html',
  styleUrl: './tipo-solicitudes-form.component.scss'
})
export class TipoSolicitudesFormComponent {
  tipoSolicitudForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tipoSolicitudesService: TipoSolicitudesService,
    private dialogRef: MatDialogRef<TipoSolicitudesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TipoSolicitudes | null
  ) {
    this.tipoSolicitudForm = this.fb.group({
      idTipoSolicitud: [data?.idTipoSolicitud ?? null],
      tipoSolicitudNombre: [data?.tipoSolicitudNombre ?? '', Validators.required],
      activacion: [data?.activacion ?? true, Validators.required]
    });
  }

  guardar() {
    const tipoSolicitud: TipoSolicitudes = this.tipoSolicitudForm.value;

    if (tipoSolicitud.idTipoSolicitud !== null && tipoSolicitud.idTipoSolicitud !== 0) {
      // actualizar
      this.tipoSolicitudesService
        .updateTipoSolicitud(tipoSolicitud.idTipoSolicitud, tipoSolicitud)
        .subscribe({
          next: () => console.log('Tipo de solicitud actualizado'),
          error: (err) => console.error(err)
        });
    } else {
      // crear
      this.tipoSolicitudesService.createTipoSolicitud(tipoSolicitud).subscribe({
        next: () => console.log('Tipo de solicitud creado'),
        error: (err) => console.error(err)
      });
    }

    this.dialogRef.close(true);
  }

  cerrar() {
    this.dialogRef.close(false);
  }
}
