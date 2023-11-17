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
import { MenuDeclaracionComponent } from './declaraciones/menu-declaracion/menu-declaracion.component';
import { DatosDevolucionComponent } from './solicitudes/datos-devolucion/datos-devolucion.component';
import { DatosPostergacionComponent } from './solicitudes/datos-postergacion/datos-postergacion.component';
import { SharedModule } from 'src/app/shared.module';
import { SubirDeclaracionComponent } from './declaraciones/subir-declaracion/subir-declaracion.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@NgModule({
    declarations: [
        RegistrarPostergacionComponent,
        RegistrarDevolucionComponent,
        RegistrarDeclaracionComponent,
        ListarPostergacionesComponent,
        ListarDevolucionesComponent,
        ListarDeclaracionesComponent,
        MisDatosComponent,
        MenuDeclaracionComponent,
        DatosDevolucionComponent,
        DatosPostergacionComponent,
        SubirDeclaracionComponent
    ],
    imports: [
        CommonModule,
        InicioDeudorRoutingModule,
        MaterialModule,
        SharedModule,
        NgxMaskDirective,
        NgxMaskPipe
    ]
})
export class InicioDeudorModule { }