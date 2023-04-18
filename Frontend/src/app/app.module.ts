import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { PaginaInicioComponent } from './componentes/pagina-inicio/pagina-inicio.component';
import { InicioFuncionarioComponent } from './componentes/funcionario/inicio-funcionario/inicio-funcionario.component';
import { InicioDeudorComponent } from './componentes/deudor/inicio-deudor/inicio-deudor.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { InicioSesionService } from './servicios/inicio-sesion.service';

export function jwtTokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    PaginaInicioComponent,
    InicioFuncionarioComponent,
    InicioDeudorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    })
  ],
  providers: [InicioSesionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
