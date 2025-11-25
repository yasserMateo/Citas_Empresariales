import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { referencia_empleado } from '../../../models/referencia_empleado.model';
import { ReferenciaEmpleadoService } from '../../../services/referencia_empleado.service';
import { ReferenciaEmpleadoFormComponent } from '../referencia-empleado-form/referencia-empleado-form.component';

import { Parentesco } from '../../../models/parentesco.model';
import { ParentescoService } from '../../../services/parentesco.service';

@Component({
  selector: 'app-referencia-empleado-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule],
  templateUrl: './referencia-empleado-list.component.html',
  styleUrl: './referencia-empleado-list.component.scss'
})
export class ReferenciaEmpleadoListComponent {
  displayedColumns: string[] = [
    'idRefenciaEmpleado',
    'nombreParentesco',
    'cedulaParentesco',
    'idParentesco',    
    'idEmpleado',
    'porcientoAsignacion',
    'montoAsignado',
    'activacion',
    'acciones'
  ];

  dataSource = new MatTableDataSource<referencia_empleado>([]);
  readonly dialog = inject(MatDialog);

  parentescos: Parentesco[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private referenciaSrv: ReferenciaEmpleadoService,
    private parentescoSrv: ParentescoService
  ) {}

  ngOnInit() {
    this.cargarReferencias();
    this.cargarParentescos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private cargarReferencias(): void {
    this.referenciaSrv.getReferencias().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => console.error(err)
    });
  }

  private cargarParentescos(): void {
    this.parentescoSrv.getParentescos().subscribe({
      next: (data) => {
        this.parentescos = data;
      },
      error: (err) => console.error(err)
    });
  }


  getParentescoNombre(idParentesco: number): string {
    const p = this.parentescos.find(x => x.idParentesco === idParentesco);
    return p ? p.parentescoNombre : String(idParentesco);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReferenciaEmpleadoFormComponent, {
      width: '480px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarReferencias();
      }
    });
  }

  editReferencia(item: referencia_empleado): void {
    const dialogRef = this.dialog.open(ReferenciaEmpleadoFormComponent, {
      width: '480px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarReferencias();
      }
    });
  }

  deleteReferencia(idRefenciaEmpleado: number): void {
    this.referenciaSrv.deleteReferencia(idRefenciaEmpleado).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(
          p => p.idRefenciaEmpleado !== idRefenciaEmpleado
        );
      },
      error: (err) => console.error(err)
    });
  }
}
