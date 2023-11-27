import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { PaginaInicioComponent } from './componentes/pagina-inicio/pagina-inicio.component';
import { InicioDeudorComponent } from './componentes/deudor/inicio-deudor/inicio-deudor.component';
import { InicioFuncionarioComponent } from './componentes/funcionario/inicio-funcionario/inicio-funcionario.component';
import { InicioDeudorModule } from './componentes/deudor/inicio-deudor.module';
import { CambiarContrasenaComponent } from './componentes/contrasena/cambiar-contrasena/cambiar-contrasena.component';

const routes: Routes = [
  { path: '', redirectTo: '/pagina-inicio', pathMatch: 'full' },
  { path: 'login', component: InicioSesionComponent },
  { path: 'pagina-inicio', component: PaginaInicioComponent },
  { path: 'recuperarContrasena/:token', component: CambiarContrasenaComponent},
  { path: 'deudor', loadChildren: () => import('./componentes/deudor/inicio-deudor.module').then(m => m.InicioDeudorModule)},
  { path: 'funcionario', loadChildren: () => import('./componentes/funcionario/inicio-funcionario.module').then(m => m.InicioFuncionarioModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
