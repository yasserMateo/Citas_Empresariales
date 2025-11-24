import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { Parentesco } from '../../../models/parentesco.model';
import { ParentescoService } from '../../../services/parentesco.service';
import { ParentescoFormComponent } from '../Parentesco-form/parentesco-form.component';

@Component({
  selector: 'app-parentesco-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule],
  templateUrl: './parentesco-list.component.html',
  styleUrl: './parentesco-list.component.scss'
})
export class ParentescoListComponent {
  displayedColumns: string[] = ['idParentesco', 'parentescoNombre', 'acciones'];
  dataSource = new MatTableDataSource<Parentesco>([]);
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private parentescoService: ParentescoService) {}

  ngOnInit() {
    this.cargarParentescos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  private cargarParentescos(): void {
    this.parentescoService.getParentescos().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => console.error(err)
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ParentescoFormComponent, {
      width: '400px',
      data: null 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.cargarParentescos();
      }
    });
  }

  editParentesco(parentesco: Parentesco): void {
    const dialogRef = this.dialog.open(ParentescoFormComponent, {
      width: '400px',
      data: parentesco
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarParentescos();
      }
    });
  }

  deleteParentesco(idParentesco: number): void {
    this.parentescoService.deleteParentesco(idParentesco).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(
          p => p.idParentesco !== idParentesco
        );
      },
      error: (err) => console.error(err)
    });
  }
}
