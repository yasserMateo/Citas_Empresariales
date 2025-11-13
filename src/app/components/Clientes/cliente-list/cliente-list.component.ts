import { Component, inject, ViewChild } from '@angular/core';
import { Cliente } from '../../../models/clientes.model';
import { ClienteService } from '../../../services/cliente.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatIcon],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.scss'
})
export class ClienteListComponent {
  displayedColumns: string[] = ['clienteId', 'nombreCliente', 'telefono', 'email', 'status', 'acciones'];
  dataSource = new MatTableDataSource<Cliente>([]);
  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  //hola 
  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        console.error(err);
      }
    });

    this.dataSource.paginator = this.paginator;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ClienteFormComponent, {
      width: '400px',
    });
  }

  editCliente(cliente: Cliente): void {
    const dialogRef = this.dialog.open(ClienteFormComponent, {
      width: '400px',
      data: cliente
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(c => c.clienteId !== cliente.clienteId);
        this.clienteService.getCliente(cliente.clienteId).subscribe({
          next: (data) => {
            this.dataSource.data.push(data);
            this.dataSource.data = [...this.dataSource.data]; 
          },
          error: (err) => {
            console.error(err);
          }
        });
      }
    });
  }

  deleteCliente(clienteId: number): void {
    this.clienteService.deleteCliente(clienteId).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(c => c.clienteId !== clienteId);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
