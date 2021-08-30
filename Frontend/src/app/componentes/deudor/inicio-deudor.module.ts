import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import { InicioDeudorRoutingModule } from './inicio-deudor-routing.module';
import { RegistrarPostergacionComponent } from './solicitudes/registrar-postergacion/registrar-postergacion.component';
import { RegistrarDevolucionComponent } from './solicitudes/registrar-devolucion/registrar-devolucion.component';
import { ListarPostergacionesComponent } from './solicitudes/listar-postergaciones/listar-postergaciones.component';
import { ListarDevolucionesComponent } from './solicitudes/listar-devoluciones/listar-devoluciones.component';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatRadioModule } from '@angular/material/radio'; 
import { MatSelectModule } from '@angular/material/select'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MisDatosComponent } from './mis-datos/mis-datos.component';

@NgModule({
  declarations: [
    RegistrarPostergacionComponent,
    RegistrarDevolucionComponent,
    ListarPostergacionesComponent,
    ListarDevolucionesComponent,
    MisDatosComponent
  ],
  imports: [
    CommonModule,
    InicioDeudorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [

  ],
})
export class InicioDeudorModule { }