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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { TipoSolicitudesVarias } from '../../../models/tipo_solicitudesVarias.model';
import { TipoSolicitudesVariasService } from '../../../services/tipo_solicitudesVarias.service';

@Component({
  selector: 'app-tipo-solicitudes-varias-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    ReactiveFormsModule
  ],
  templateUrl: './tipo-solicitudes-varias-form.component.html',
  styleUrl: './tipo-solicitudes-varias-form.component.scss'
})
export class TipoSolicitudesVariasFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tipoSolicitudesVariasSrv: TipoSolicitudesVariasService,
    private dialogRef: MatDialogRef<TipoSolicitudesVariasFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TipoSolicitudesVarias | null
  ) {
    this.form = this.fb.group({
      idTipoSolicitudVaria: [data?.idTipoSolicitudVaria ?? null],
      idTipoSolicitud: [
        data?.idTipoSolicitud ?? null,
        [Validators.required, Validators.min(1)]
      ],
      tipoSolicitudVariaNombre: [
        data?.tipoSolicitudVariaNombre ?? '',
        [Validators.required, Validators.maxLength(100)]
      ],
      activacion: [data?.activacion ?? true]
    });
  }

  guardar(): void {
    const tipo: TipoSolicitudesVarias = this.form.value;

    if (tipo.idTipoSolicitudVaria != null) {
      // actualizar
      this.tipoSolicitudesVariasSrv
        .updateTipoSolicitudVaria(tipo.idTipoSolicitudVaria, tipo)
        .subscribe({
          next: () => this.dialogRef.close(true),
          error: (err) => console.error(err)
        });
    } else {
      // crear
      this.tipoSolicitudesVariasSrv.createTipoSolicitudVaria(tipo).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error(err)
      });
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
