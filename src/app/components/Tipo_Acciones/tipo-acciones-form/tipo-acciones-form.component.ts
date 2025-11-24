import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TipoAccionesService } from '../../../services/tipo_acciones.service';
import { TipoAcciones } from '../../../models/tipo_acciones.model';

@Component({
  selector: 'app-tipo-acciones-form',
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
  templateUrl: './tipo-acciones-form.component.html',
  styleUrl: './tipo-acciones-form.component.scss'
})
export class TipoAccionesFormComponent {
  tipoAccionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tipoAccionesService: TipoAccionesService,
    private dialogRef: MatDialogRef<TipoAccionesFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TipoAcciones
  ) {
    this.tipoAccionForm = this.fb.group({
      idTipoAccion: [data?.idTipoAccion ?? null],
      accion: [data?.accion ?? '', Validators.required],
      esDebito: [data?.esDebito ?? false, Validators.required],
      activacion: [data?.activacion ?? true, Validators.required]
    });
  }

  guardar() {
    const tipoAccion: TipoAcciones = this.tipoAccionForm.value;

    if (tipoAccion.idTipoAccion !== null && tipoAccion.idTipoAccion !== 0) {
      this.tipoAccionesService.updateTipoAccion(tipoAccion.idTipoAccion, tipoAccion).subscribe({
        next: () => console.log('Tipo de acción actualizado'),
        error: (err) => console.error(err)
      });
    } else {
      this.tipoAccionesService.createTipoAccion(tipoAccion).subscribe({
        next: () => console.log('Tipo de acción creado'),
        error: (err) => console.error(err)
      });
    }

    this.dialogRef.close(true);
  }

  cerrar() {
    this.dialogRef.close(false);
  }
}
