import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioDeudorComponent } from './inicio-deudor/inicio-deudor.component'
import { ListarDeclaracionesComponent } from './declaraciones/listar-declaraciones/listar-declaraciones.component';
import { RegistrarDeclaracionComponent } from './declaraciones/registrar-declaracion/registrar-declaracion.component';

const routes: Routes = [
    { path: '', component:InicioDeudorComponent, 
    children:[
        {path: 'declaracion', component: ListarDeclaracionesComponent},
        {path: '', component: RegistrarDeclaracionComponent}
    ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class InicioDeudorRoutingModule { }