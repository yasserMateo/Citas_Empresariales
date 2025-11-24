import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

import { TipoSolicitudes } from '../../../models/tipo_solicitudes.model';
import { TipoSolicitudesService } from '../../../services/tipo_solicitudes.service';
import { TipoSolicitudesFormComponent } from '../tipo-solicitudes-form/tipo-solicitudes-form.component';

@Component({
  selector: 'app-tipo-solicitudes-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIcon],
  templateUrl: './tipo-solicitudes-list.component.html',
  styleUrl: './tipo-solicitudes-list.component.scss'
})
export class TipoSolicitudesListComponent {
  displayedColumns: string[] = ['idTipoSolicitud', 'tipoSolicitudNombre', 'activacion', 'acciones'];
  dataSource = new MatTableDataSource<TipoSolicitudes>([]);
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tipoSolicitudesService: TipoSolicitudesService) {}

  ngOnInit() {
    this.cargarTipoSolicitudes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private cargarTipoSolicitudes(): void {
    this.tipoSolicitudesService.getTipoSolicitudes().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TipoSolicitudesFormComponent, {
      width: '400px',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarTipoSolicitudes();
      }
    });
  }

  editTipoSolicitud(tipo: TipoSolicitudes): void {
    const dialogRef = this.dialog.open(TipoSolicitudesFormComponent, {
      width: '400px',
      data: tipo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarTipoSolicitudes();
      }
    });
  }

  deleteTipoSolicitud(idTipoSolicitud: number): void {
    this.tipoSolicitudesService.deleteTipoSolicitud(idTipoSolicitud).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(
          t => t.idTipoSolicitud !== idTipoSolicitud
        );
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
