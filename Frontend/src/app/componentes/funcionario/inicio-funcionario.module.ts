import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import { InicioFuncionarioRoutingModule } from './inicio-funcionario-routing.module';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { DatosDeclaracionComponent } from './declaraciones/datos-declaracion/datos-declaracion.component';
import { DeclaracionesDeudorComponent } from './declaraciones/declaraciones-deudor/declaraciones-deudor.component';
import { MatTableModule } from '@angular/material/table'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatRadioModule} from '@angular/material/radio'; 
import {MatSelectModule} from '@angular/material/select'; 

@NgModule({
  declarations: [
    ListarUsuariosComponent,
    DatosDeclaracionComponent,
    DeclaracionesDeudorComponent
  ],
  imports: [
    CommonModule,
    InicioFuncionarioRoutingModule,
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
    MatTableModule
  ],
  entryComponents: [

  ],
})
export class InicioFuncionarioModule { }