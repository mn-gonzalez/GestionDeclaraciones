import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";
import { InicioDeudorRoutingModule } from './inicio-deudor-routing.module';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    InicioDeudorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  entryComponents: [

  ],
})
export class InicioDeudorModule { }