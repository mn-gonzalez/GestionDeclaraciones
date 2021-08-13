import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioFuncionarioComponent } from './inicio-funcionario/inicio-funcionario.component';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { DatosDeclaracionComponent } from './declaraciones/datos-declaracion/datos-declaracion.component';
import { DeclaracionesDeudorComponent } from './declaraciones/declaraciones-deudor/declaraciones-deudor.component';

const routes: Routes = [
    { path: '', component:InicioFuncionarioComponent, 
    children:[
        {path: '', component: ListarUsuariosComponent},
        {path: 'declaracion', component: DatosDeclaracionComponent},
        {path: 'declaraciones', component: DeclaracionesDeudorComponent}
    ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class InicioFuncionarioRoutingModule { }