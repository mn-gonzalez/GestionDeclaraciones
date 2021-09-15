import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { InicioDeudorRoutingModule } from './inicio-deudor-routing.module';
import { RegistrarPostergacionComponent } from './solicitudes/registrar-postergacion/registrar-postergacion.component';
import { RegistrarDevolucionComponent } from './solicitudes/registrar-devolucion/registrar-devolucion.component';
import { ListarPostergacionesComponent } from './solicitudes/listar-postergaciones/listar-postergaciones.component';
import { ListarDevolucionesComponent } from './solicitudes/listar-devoluciones/listar-devoluciones.component';
import { ListarDeclaracionesComponent } from './declaraciones/listar-declaraciones/listar-declaraciones.component';
import { MisDatosComponent } from './mis-datos/mis-datos.component';
import { RegistrarDeclaracionComponent } from './declaraciones/registrar-declaracion/registrar-declaracion.component';
import { MensajesComponent } from './mensajes/mensajes.component';

@NgModule({
  declarations: [
    RegistrarPostergacionComponent,
    RegistrarDevolucionComponent,
    RegistrarDeclaracionComponent,
    ListarPostergacionesComponent,
    ListarDevolucionesComponent,
    ListarDeclaracionesComponent,
    MisDatosComponent,
    MensajesComponent
  ],
  imports: [
    CommonModule,
    InicioDeudorRoutingModule,
    MaterialModule
  ],
  entryComponents: [

  ],
})
export class InicioDeudorModule { }