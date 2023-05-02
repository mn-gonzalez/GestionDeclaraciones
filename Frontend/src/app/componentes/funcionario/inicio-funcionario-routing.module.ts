import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioFuncionarioComponent } from './inicio-funcionario/inicio-funcionario.component';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { DatosDeclaracionComponent } from './declaraciones/datos-declaracion/datos-declaracion.component';
import { DeclaracionesDeudorComponent } from './declaraciones/declaraciones-deudor/declaraciones-deudor.component';
import { DeclaracionesPorRevisarComponent } from './declaraciones/declaraciones-por-revisar/declaraciones-por-revisar.component';
import { RevisarDeclaracionComponent } from './declaraciones/revisar-declaracion/revisar-declaracion.component';

const routes: Routes = [
    { path: '', component:InicioFuncionarioComponent, 
    children:[
        {path: '', component: ListarUsuariosComponent},
        {path: 'declaracion/:id', component: DatosDeclaracionComponent},
        {path: 'declaraciones/:rut', component: DeclaracionesDeudorComponent},
        {path: 'declaraciones/revisar/pendientes', component: DeclaracionesPorRevisarComponent},
        {path: 'declaraciones/revisar/:id', component: RevisarDeclaracionComponent}
    ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class InicioFuncionarioRoutingModule { }