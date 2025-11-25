import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { SolicitudesVarias } from '../../../models/solicitudes_varias.model';
import { SolicitudesVariasService } from '../../../services/solicitudes_varias.service';
import { SolicitudesVariasFormComponent } from '../solicitudes-varias-form/solicitudes-varias-form.component';

@Component({
  selector: 'app-solicitudes-varias-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule],
  templateUrl: './solicitudes-varias-list.component.html',
  styleUrl: './solicitudes-varias-list.component.scss'
})
export class SolicitudesVariasListComponent {
  displayedColumns: string[] = [
    'idSolicitudVaria',
    'idTipoSolicitud',
    'idEmpleado',
    'idTipoSolicitudVaria',
    'monto',
    'fechaEfectividad',
    'garante',
    'noResolucion',
    'fecha',
    'acciones'
  ];

  dataSource = new MatTableDataSource<SolicitudesVarias>([]);
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private solicitudesSrv: SolicitudesVariasService) {}

  ngOnInit() {
    this.cargarSolicitudes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private cargarSolicitudes(): void {
    this.solicitudesSrv.getSolicitudesVarias().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => console.error(err)
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SolicitudesVariasFormComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarSolicitudes();
      }
    });
  }

  editSolicitud(item: SolicitudesVarias): void {
    const dialogRef = this.dialog.open(SolicitudesVariasFormComponent, {
      width: '600px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarSolicitudes();
      }
    });
  }

  deleteSolicitud(idSolicitudVaria: number): void {
    this.solicitudesSrv.deleteSolicitudVaria(idSolicitudVaria).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(
          s => s.idSolicitudVaria !== idSolicitudVaria
        );
      },
      error: (err) => console.error(err)
    });
  }
}
