import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { TipoDocumento } from '../../../models/tipo_documento.model';
import { TipoDocumentoService } from '../../../services/tipo_documento.service';
import { TipoDocumentoFormComponent } from '../tipo-documento-form/tipo-documento-form.component';

@Component({
  selector: 'app-tipo-documento-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule],
  templateUrl: './tipo-documento-list.component.html',
  styleUrl: './tipo-documento-list.component.scss'
})
export class TipoDocumentoListComponent {
  displayedColumns: string[] = [
    'idTipoDocumento',
    'tipoDocumentoNombre',
    'acciones'
  ];

  dataSource = new MatTableDataSource<TipoDocumento>([]);
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tipoDocumentoSrv: TipoDocumentoService) {}

  ngOnInit() {
    this.cargarTiposDocumento();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private cargarTiposDocumento(): void {
    this.tipoDocumentoSrv.getTiposDocumentos().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => console.error(err)
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TipoDocumentoFormComponent, {
      width: '480px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarTiposDocumento();
      }
    });
  }

  editTipoDocumento(item: TipoDocumento): void {
    const dialogRef = this.dialog.open(TipoDocumentoFormComponent, {
      width: '480px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarTiposDocumento();
      }
    });
  }

  deleteTipoDocumento(idTipoDocumento: number): void {
    this.tipoDocumentoSrv.deleteTipoDocumento(idTipoDocumento).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(
          d => d.idTipoDocumento !== idTipoDocumento
        );
      },
      error: (err) => console.error(err)
    });
  }
}
