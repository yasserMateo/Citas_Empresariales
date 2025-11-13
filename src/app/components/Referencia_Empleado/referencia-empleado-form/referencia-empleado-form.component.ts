// src/app/pages/referencia-empleado/referencia-empleado-form/referencia-empleado-form.component.ts
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { referencia_empleado } from '../../../models/referencia_empleado.model';
import { ReferenciaEmpleadoService } from '../../../services/referencia_empleado.service';

@Component({
  selector: 'app-referencia-empleado-form',
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
  templateUrl: './referencia-empleado-form.component.html',
  styleUrl: './referencia-empleado-form.component.scss'
})
export class ReferenciaEmpleadoFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private referenciaSrv: ReferenciaEmpleadoService,
    private dialogRef: MatDialogRef<ReferenciaEmpleadoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: referencia_empleado | null
  ) {
    this.form = this.fb.group({
      idRefenciaEmpleado: [data?.idreferenciaEmpleado ?? null],
      nombreParentesco: [data?.nombreParentesco ?? '', [Validators.required, Validators.maxLength(100)]],
      cedulaParentesco: [data?.cedulaParentesco ?? '', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      idParentesco: [data?.idParentesco ?? null, [Validators.required, Validators.min(1)]],
      idEmpleado: [data?.idEmpleado ?? null, [Validators.required, Validators.min(1)]],
      porcientoAsignacion: [data?.porcientoAsignacion ?? null, [Validators.required, Validators.min(0), Validators.max(100)]],
      montoAsignado: [data?.montoAsignado ?? null], // opcional
      activacion: [data?.activacion ?? true]
    });
  }

  guardar(): void {
    const ref: referencia_empleado = this.form.value;

    if (ref.idreferenciaEmpleado != null) {
      this.referenciaSrv.updateReferencia(ref.idreferenciaEmpleado, ref).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error(err)
      });
    } else {
      this.referenciaSrv.createReferencia(ref).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error(err)
      });
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
