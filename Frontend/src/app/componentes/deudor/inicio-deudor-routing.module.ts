import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioDeudorComponent } from './inicio-deudor/inicio-deudor.component'
import { ListarDeclaracionesComponent } from './declaraciones/listar-declaraciones/listar-declaraciones.component';
import { RegistrarDeclaracionComponent } from './declaraciones/registrar-declaracion/registrar-declaracion.component';
import { RegistrarDevolucionComponent } from './solicitudes/registrar-devolucion/registrar-devolucion.component';
import { MisDatosComponent } from './mis-datos/mis-datos.component';

const routes: Routes = [
    { path: '', component:InicioDeudorComponent, 
    children:[
        {path: 'declaraciones', component: ListarDeclaracionesComponent},
        {path: 'devolucion', component: RegistrarDevolucionComponent},
        {path: 'mis-datos', component: MisDatosComponent},
        {path: '', component: RegistrarDeclaracionComponent}
    ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class InicioDeudorRoutingModule { }