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

import { TipoDocumento } from '../../../models/tipo_documento.model';
import { TipoDocumentoService } from '../../../services/tipo_documento.service';

@Component({
  selector: 'app-tipo-documento-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './tipo-documento-form.component.html',
  styleUrl: './tipo-documento-form.component.scss'
})
export class TipoDocumentoFormComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tipoDocumentoSrv: TipoDocumentoService,
    private dialogRef: MatDialogRef<TipoDocumentoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TipoDocumento | null
  ) {
    this.form = this.fb.group({
      idTipoDocumento: [data?.idTipoDocumento ?? null],
      tipoDocumentoNombre: [
        data?.tipoDocumentoNombre ?? '',
        [Validators.required, Validators.maxLength(100)]
      ]
    });
  }

  guardar(): void {
    const doc: TipoDocumento = this.form.value;

    if (doc.idTipoDocumento != null) {
      // actualizar
      this.tipoDocumentoSrv.updateTipoDocumento(doc.idTipoDocumento, doc).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error(err)
      });
    } else {
      // crear
      this.tipoDocumentoSrv.createTipoDocumento(doc).subscribe({
        next: () => this.dialogRef.close(true),
        error: (err) => console.error(err)
      });
    }
  }

  cerrar(): void {
    this.dialogRef.close();
  }
}
