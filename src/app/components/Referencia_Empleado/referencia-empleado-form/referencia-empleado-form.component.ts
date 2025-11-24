import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';

import { referencia_empleado } from '../../../models/referencia_empleado.model';
import { ReferenciaEmpleadoService } from '../../../services/referencia_empleado.service';
import { Parentesco } from '../../../models/parentesco.model';
import { ParentescoService } from '../../../services/parentesco.service';

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
    MatSelectModule,
    ReactiveFormsModule
  ],
  templateUrl: './referencia-empleado-form.component.html',
  styleUrl: './referencia-empleado-form.component.scss'
})
export class ReferenciaEmpleadoFormComponent implements OnInit {
  form: FormGroup;
  parentescos: Parentesco[] = [];

  constructor(
    private fb: FormBuilder,
    private referenciaSrv: ReferenciaEmpleadoService,
    private parentescoSrv: ParentescoService,
    private dialogRef: MatDialogRef<ReferenciaEmpleadoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: referencia_empleado | null
  ) {
    this.form = this.fb.group({
      idRefenciaEmpleado: [data?.idRefenciaEmpleado ?? null],
      nombreParentesco: [
        data?.nombreParentesco ?? '',
        [Validators.required, Validators.maxLength(100)]
      ],
      cedulaParentesco: [
        data?.cedulaParentesco ?? '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(20)]
      ],
      idParentesco: [
        data?.idParentesco ?? null,
        [Validators.required, Validators.min(1)]
      ],
      idEmpleado: [
        data?.idEmpleado ?? null,
        [Validators.required, Validators.min(1)]
      ],
      porcientoAsignacion: [
        data?.porcientoAsignacion ?? null,
        [Validators.required, Validators.min(0), Validators.max(100)]
      ],
      activacion: [data?.activacion ?? true]
    });

    
   
  }

  ngOnInit(): void {
    this.parentescoSrv.getParentescos().subscribe({
      next: (data) => {
        this.parentescos = data;

        
        const id = this.form.get('idParentesco')?.value;
        if (id) {
          const p = this.parentescos.find(x => x.idParentesco === id);
          if (p) {
            this.form.patchValue({ nombreParentesco: p.parentescoNombre });
          }
        }
      },
      error: (err) => console.error(err)
    });
  }

  guardar(): void {
    const ref: referencia_empleado = this.form.value;

    if (ref.idRefenciaEmpleado != null) {
      this.referenciaSrv.updateReferencia(ref.idRefenciaEmpleado, ref).subscribe({
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
