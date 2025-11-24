import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';

import { TipoAcciones } from '../../../models/tipo_acciones.model';
import { TipoAccionesService } from '../../../services/tipo_acciones.service';
import { TipoAccionesFormComponent } from '../tipo-acciones-form/tipo-acciones-form.component';

@Component({
  selector: 'app-tipo-acciones-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIcon],
  templateUrl: './tipo-acciones-list.component.html',
  styleUrl: './tipo-acciones-list.component.scss'
})
export class TipoAccionesListComponent {
  displayedColumns: string[] = ['idTipoAccion', 'accion', 'esDebito', 'activacion', 'acciones'];
  dataSource = new MatTableDataSource<TipoAcciones>([]);
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tipoAccionesService: TipoAccionesService) {}

  ngOnInit() {
    this.cargarTipoAcciones();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private cargarTipoAcciones(): void {
    this.tipoAccionesService.getTipoAcciones().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TipoAccionesFormComponent, {
      width: '400px',
      data: null  
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.cargarTipoAcciones();
      }
    });
  }

  editTipoAccion(tipo: TipoAcciones): void {
    const dialogRef = this.dialog.open(TipoAccionesFormComponent, {
      width: '400px',
      data: tipo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.cargarTipoAcciones();
      }
    });
  }

  deleteTipoAccion(idTipoAccion: number): void {
    this.tipoAccionesService.deleteTipoAccion(idTipoAccion).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(
          t => t.idTipoAccion !== idTipoAccion
        );

      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
