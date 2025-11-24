import { Component, inject, ViewChild } from '@angular/core';
import { Roles } from '../../../models/roles.model';
import { RolesService } from '../../../services/roles.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { RolFormComponent } from '../roles-form/roles-form.component'; 

@Component({
  selector: 'app-roles-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIcon],
  templateUrl: './roles-list.component.html',
  styleUrl: './roles-list.component.scss'
})
export class RolesListComponent {
  displayedColumns: string[] = ['idRol', 'rolNombre', 'descripcion', 'activacion', 'acciones'];
  dataSource = new MatTableDataSource<Roles>([]);
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rolesService: RolesService) {}

  ngOnInit() {
    this.rolesService.getRoles().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  openDialog(): void {
    this.dialog.open(RolFormComponent, {
      width: '400px',
    });
  }

  editRol(rol: Roles): void {
    const dialogRef = this.dialog.open(RolFormComponent, {
      width: '400px',
      data: rol
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(r => r.idRol !== rol.idRol);
        this.rolesService.getRol(rol.idRol).subscribe({
          next: (data) => {
            this.dataSource.data.push(data);
            // forzar refresco de la tabla
            this.dataSource.data = [...this.dataSource.data];
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    });
  }

  deleteRol(idRol: number): void {
    this.rolesService.deleteRol(idRol).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(r => r.idRol !== idRol);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
