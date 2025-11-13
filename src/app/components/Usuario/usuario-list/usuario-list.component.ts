// src/app/pages/usuario/usuario-list/usuario-list.component.ts
import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIconModule],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.scss'
})
export class UsuarioListComponent {
  // Ajusta las columnas que quieres mostrar en la tabla
  displayedColumns: string[] = [
    'IdUsuario',
    'Nombre',
    'NombreUsuario',
    'IdRol',
    'Activacion',
    'acciones'
  ];

  dataSource = new MatTableDataSource<Usuario>([]);
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => (this.dataSource.data = data),
      error: (err) => console.error(err)
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(): void {
    this.dialog.open(UsuarioFormComponent, {
      width: '400px',
    });
  }

  editUsuario(usuario: Usuario): void {
    const dialogRef = this.dialog.open(UsuarioFormComponent, {
      width: '400px',
      data: usuario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(u => u.idUsuario !== usuario.idUsuario);
        this.usuarioService.getUsuario(usuario.idUsuario).subscribe({
          next: (data) => {
            this.dataSource.data.push(data);
            this.dataSource.data = [...this.dataSource.data];
          },
          error: (err) => console.error(err)
        });
      }
    });
  }

  deleteUsuario(idUsuario: number): void {
    this.usuarioService.deleteUsuario(idUsuario).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(u => u.idUsuario !== idUsuario);
      },
      error: (err) => console.error(err)
    });
  }
}
