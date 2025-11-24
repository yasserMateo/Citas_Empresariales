import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { ClienteListComponent } from './components/Clientes/cliente-list/cliente-list.component';
import { ParentescoListComponent } from './components/Parentesco/parentesco-list/parentesco-list.component';
import { ReferenciaEmpleadoListComponent } from './components/Referencia_Empleado/referencia-empleado-list/referencia-empleado-list.component';
import { UsuarioListComponent } from './components/Usuario/usuario-list/usuario-list.component';
import { RolesListComponent } from './components/Roles/roles-list/roles-list.component';
import { TipoAccionesListComponent } from './components/Tipo_Acciones/tipo-acciones-list/tipo-acciones-list.component';
import { TipoSolicitudesListComponent } from './components/Tipo_Solicitudes/tipo-solicitudes-list/tipo-solicitudes-list.component';

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
            },
            {
                path: 'Roles',
                component: RolesListComponent
            },
            {
                path: 'Tipo_Acciones',
                component: TipoAccionesListComponent
            },
            {
                path: 'Tipo_Solicitudes',
                component: TipoSolicitudesListComponent
            }
        ] 
    },
];
