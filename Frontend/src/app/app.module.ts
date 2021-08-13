import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { PaginaInicioComponent } from './componentes/pagina-inicio/pagina-inicio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioFuncionarioComponent } from './componentes/funcionario/inicio-funcionario/inicio-funcionario.component';
import { InicioDeudorComponent } from './componentes/deudor/inicio-deudor/inicio-deudor.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistrarDeclaracionComponent } from './componentes/deudor/declaraciones/registrar-declaracion/registrar-declaracion.component';
import { ListarDeclaracionesComponent } from './componentes/deudor/declaraciones/listar-declaraciones/listar-declaraciones.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatRadioModule} from '@angular/material/radio'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatTreeModule} from '@angular/material/tree'; 

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    PaginaInicioComponent,
    InicioFuncionarioComponent,
    InicioDeudorComponent,
    RegistrarDeclaracionComponent,
    ListarDeclaracionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatStepperModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatTreeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
