import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { TipoSolicitudesVarias } from '../../../models/tipo_solicitudesVarias.model';
import { TipoSolicitudesVariasService } from '../../../services/tipo_solicitudesVarias.service';
import { TipoSolicitudesVariasFormComponent } from '../tipo-solicitudes-varias-form/tipo-solicitudes-varias-form.component';

@Component({
  selector: 'app-tipo-solicitudes-varias-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule],
  templateUrl: './tipo-solicitudes-varias-list.component.html',
  styleUrl: './tipo-solicitudes-varias-list.component.scss'
})
export class TipoSolicitudesVariasListComponent {
  displayedColumns: string[] = [
    'idTipoSolicitudVaria',
    'idTipoSolicitud',
    'tipoSolicitudVariaNombre',
    'activacion',
    'acciones'
  ];

  dataSource = new MatTableDataSource<TipoSolicitudesVarias>([]);
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private tipoSolicitudesVariasSrv: TipoSolicitudesVariasService
  ) {}

  ngOnInit() {
    this.cargarTiposSolicitudesVarias();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private cargarTiposSolicitudesVarias(): void {
    this.tipoSolicitudesVariasSrv.getTiposSolicitudesVarias().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => console.error(err)
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TipoSolicitudesVariasFormComponent, {
      width: '480px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarTiposSolicitudesVarias();
      }
    });
  }

  editTipoSolicitudVaria(item: TipoSolicitudesVarias): void {
    const dialogRef = this.dialog.open(TipoSolicitudesVariasFormComponent, {
      width: '480px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarTiposSolicitudesVarias();
      }
    });
  }

  deleteTipoSolicitudVaria(idTipoSolicitudVaria: number): void {
    this.tipoSolicitudesVariasSrv.deleteTipoSolicitudVaria(idTipoSolicitudVaria).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(
          t => t.idTipoSolicitudVaria !== idTipoSolicitudVaria
        );
      },
      error: (err) => console.error(err)
    });
  }
}
