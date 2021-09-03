import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioFuncionarioRoutingModule } from './inicio-funcionario-routing.module';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { DatosDeclaracionComponent } from './declaraciones/datos-declaracion/datos-declaracion.component';
import { DeclaracionesDeudorComponent } from './declaraciones/declaraciones-deudor/declaraciones-deudor.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    ListarUsuariosComponent,
    DatosDeclaracionComponent,
    DeclaracionesDeudorComponent
  ],
  imports: [
    CommonModule,
    InicioFuncionarioRoutingModule,
    MaterialModule
  ],
  entryComponents: [

  ],
})
export class InicioFuncionarioModule { }