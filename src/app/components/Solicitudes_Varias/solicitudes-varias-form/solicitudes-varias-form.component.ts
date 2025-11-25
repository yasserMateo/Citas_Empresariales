import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { SolicitudesVarias } from '../../../models/solicitudes_varias.model';
import { SolicitudesVariasService } from '../../../services/solicitudes_varias.service';

@Component({
  selector: 'app-solicitudes-varias-form',
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
  templateUrl: './solicitudes-varias-form.component.html',
  styleUrl: './solicitudes-varias-form.component.scss'
})
export class SolicitudesVariasFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private solicitudesSrv: SolicitudesVariasService,
    private dialogRef: MatDialogRef<SolicitudesVariasFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SolicitudesVarias | null
  ) {
    this.form = this.fb.group({
      idSolicitudVaria: [data?.idSolicitudVaria ?? null],
      idTipoSolicitud: [
        data?.idTipoSolicitud ?? null,
        [Validators.required, Validators.min(1)]
      ],
      idEmpleado: [
        data?.idEmpleado ?? null,
        [Validators.required, Validators.min(1)]
      ],
      idTipoSolicitudVaria: [
        data?.idTipoSolicitudVaria ?? null,
        [Validators.required, Validators.min(1)]
      ],
      monto: [
        data?.monto ?? null,
        [Validators.required, Validators.min(0.01)]
      ],
      fechaEfectividad: [data?.fechaEfectividad ?? null],
      garante: [data?.garante ?? null],
      noResolucion: [data?.noResolucion ?? null],
      fecha: [
        data?.fecha ?? new Date(),
        Validators.required
      ]
    });
  }

  guardar(): void {
    const solicitud: SolicitudesVarias = this.form.value;

    if (solicitud.idSolicitudVaria != null) {
      // actualizar
      this.solicitudesSrv
        .updateSolicitudVaria(solicitud.idSolicitudVaria, solicitud)
        .subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error(err)
        });
    } else {
      // crear
      this.solicitudesSrv.createSolicitudVaria(solicitud).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error(err)
      });
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
