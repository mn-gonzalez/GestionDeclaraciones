import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { PaginaInicioComponent } from './componentes/pagina-inicio/pagina-inicio.component';
import { InicioFuncionarioComponent } from './componentes/funcionario/inicio-funcionario/inicio-funcionario.component';
import { InicioDeudorComponent } from './componentes/deudor/inicio-deudor/inicio-deudor.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { InicioSesionService } from './servicios/inicio-sesion.service';
import { HttpconfigInterceptor } from './interceptors/httpconfig.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { NgChartsModule } from 'ng2-charts';

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
    NgxMaskDirective,
    NgxMaskPipe,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    }),
    NgChartsModule
  ],
  providers: [
    InicioSesionService, 
    { provide: HTTP_INTERCEPTORS, useClass: HttpconfigInterceptor, multi:true},
    [provideNgxMask()]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
