import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { PaginaInicioComponent } from './componentes/pagina-inicio/pagina-inicio.component';

const routes: Routes = [
  { path: '', redirectTo: '/pagina-inicio', pathMatch: 'full' },
  { path: 'login', component: InicioSesionComponent },
  { path: 'pagina-inicio', component: PaginaInicioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
