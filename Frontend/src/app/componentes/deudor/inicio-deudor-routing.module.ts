import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioDeudorComponent } from './inicio-deudor/inicio-deudor.component'
import { ListarDeclaracionesComponent } from './declaraciones/listar-declaraciones/listar-declaraciones.component';
import { RegistrarDeclaracionComponent } from './declaraciones/registrar-declaracion/registrar-declaracion.component';
import { RegistrarDevolucionComponent } from './solicitudes/registrar-devolucion/registrar-devolucion.component';
import { MisDatosComponent } from './mis-datos/mis-datos.component';
import { DatosDeclaracionComponent } from '../funcionario/declaraciones/datos-declaracion/datos-declaracion.component';
import { MenuDeclaracionComponent } from './declaraciones/menu-declaracion/menu-declaracion.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { ListarDevolucionesComponent } from './solicitudes/listar-devoluciones/listar-devoluciones.component';
import { DatosDevolucionComponent } from './solicitudes/datos-devolucion/datos-devolucion.component';
import { RegistrarPostergacionComponent } from './solicitudes/registrar-postergacion/registrar-postergacion.component';
import { ListarPostergacionesComponent } from './solicitudes/listar-postergaciones/listar-postergaciones.component';

const routes: Routes = [
    { path: '', component:InicioDeudorComponent, 
    children:[
        {path: 'declaraciones', component: ListarDeclaracionesComponent},
        {path: 'declaracion/:id', component: DatosDeclaracionComponent},
        {path: 'devolucion', component: RegistrarDevolucionComponent},
        {path: 'mis-datos', component: MisDatosComponent},
        {path: 'mensajes', component: MensajesComponent},
        {path: 'declaracion', component: RegistrarDeclaracionComponent},
        {path: 'devoluciones', component: ListarDevolucionesComponent},
        {path: 'devoluciones/:id', component: DatosDevolucionComponent},
        {path: 'postergacion', component: RegistrarPostergacionComponent},
        {path: 'postergaciones', component: ListarPostergacionesComponent},
        {path: '', component: MenuDeclaracionComponent}
    ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class InicioDeudorRoutingModule { }