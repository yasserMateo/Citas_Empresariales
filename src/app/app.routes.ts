import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { ClienteListComponent } from './components/Clientes/cliente-list/cliente-list.component';
import { ParentescoListComponent } from './components/Parentesco/parentesco-list/parentesco-list.component';
import { ReferenciaEmpleadoListComponent } from './components/Referencia_Empleado/referencia-empleado-list/referencia-empleado-list.component';
import { UsuarioListComponent } from './components/Usuario/usuario-list/usuario-list.component';

export const routes: Routes = [
    { path: '', 
        component: LayoutComponent, 
        children: [
            {
                path: 'cliente',
                component: ClienteListComponent
            },
            {
                path: 'parentesco',
                component: ParentescoListComponent
            },
            {
                path: 'Referencia_Empleado',
                component: ReferenciaEmpleadoListComponent
            },
            {
                path: 'Usuarios',
                component: UsuarioListComponent
            }
        ] 
    },
];
