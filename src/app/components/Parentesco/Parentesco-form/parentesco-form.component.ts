// src/app/pages/parentesco/parentesco-form/parentesco-form.component.ts
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Parentesco} from '../../../models/parentesco.model';
import { ParentescoService } from '../../../services/parentesco.service';

@Component({
  selector: 'app-parentesco-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './parentesco-form.component.html',
  styleUrl: './parentesco-form.component.scss'
})
export class ParentescoFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private parentescoService: ParentescoService,
    private dialogRef: MatDialogRef<ParentescoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Parentesco | null
  ) {
    this.form = this.fb.group({
      idParentesco: [data?.idParentesco ?? null],
      parentescoNombre: [data?.parentescoNombre ?? '', [Validators.required, Validators.maxLength(100)]]
    });
  }

  guardar(): void {
    const parentesco: Parentesco = this.form.value;

    if (parentesco.idParentesco != null) {
      this.parentescoService.updateParentesco(parentesco.idParentesco, parentesco).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error(err)
      });
    } else {
      this.parentescoService.createParentesco(parentesco).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error(err)
      });
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
