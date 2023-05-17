import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioFuncionarioComponent } from './inicio-funcionario/inicio-funcionario.component';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { DatosDeclaracionComponent } from './declaraciones/datos-declaracion/datos-declaracion.component';
import { DeclaracionesDeudorComponent } from './declaraciones/declaraciones-deudor/declaraciones-deudor.component';
import { DeclaracionesPorRevisarComponent } from './declaraciones/declaraciones-por-revisar/declaraciones-por-revisar.component';
import { RevisarDeclaracionComponent } from './declaraciones/revisar-declaracion/revisar-declaracion.component';
import { ListarFuncionariosComponent } from './usuarios/listar-funcionarios/listar-funcionarios.component';
import { ListarUtmComponent } from './utm/listar-utm/listar-utm.component';
import { DatosDevolucionComponent } from '../deudor/solicitudes/datos-devolucion/datos-devolucion.component';
import { DevolucionesSinRevisarComponent } from './solicitudes/devoluciones-sin-revisar/devoluciones-sin-revisar.component';
import { PostergacionesSinRevisarComponent } from './solicitudes/postergaciones-sin-revisar/postergaciones-sin-revisar.component';
import { DatosPostergacionComponent } from '../deudor/solicitudes/datos-postergacion/datos-postergacion.component';

const routes: Routes = [
    { path: '', component:InicioFuncionarioComponent, 
    children:[
        {path: 'deudores', component: ListarUsuariosComponent},
        {path: 'funcionarios', component: ListarFuncionariosComponent},
        {path: 'declaracion/:id', component: DatosDeclaracionComponent},
        {path: 'declaraciones/:rut', component: DeclaracionesDeudorComponent},
        {path: 'declaraciones/revisar/pendientes', component: DeclaracionesPorRevisarComponent},
        {path: 'declaraciones/revisar/:id', component: RevisarDeclaracionComponent},
        {path: 'utm', component: ListarUtmComponent},
        {path: 'devoluciones/revisar', component: DevolucionesSinRevisarComponent},
        {path: 'devoluciones/revisar/:id', component: DatosDevolucionComponent},
        {path: 'postergaciones/revisar', component: PostergacionesSinRevisarComponent},
        {path: 'postergaciones/revisar/:id', component: DatosPostergacionComponent}
    ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class InicioFuncionarioRoutingModule { }