import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesoChilenoPipe } from './compartidos/peso-chileno.pipe';
import { UtmPipe } from './compartidos/utm.pipe';
import { SubirDocumentacionComponent } from './compartidos/componentes/subir-documentacion/subir-documentacion.component';
import { MaterialModule } from './material.module';

@NgModule({
    declarations: [
        PesoChilenoPipe,
        UtmPipe,
        SubirDocumentacionComponent
    ],
    imports: [
        CommonModule,
        MaterialModule
    ],
    providers: [],
    bootstrap: [],
    exports: [
        PesoChilenoPipe,
        UtmPipe,
        SubirDocumentacionComponent
    ]
  })
  export class SharedModule { }