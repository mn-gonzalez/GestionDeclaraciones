import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesoChilenoPipe } from './compartidos/peso-chileno.pipe';
import { UtmPipe } from './compartidos/utm.pipe';

@NgModule({
    declarations: [
        PesoChilenoPipe,
        UtmPipe
    ],
    imports: [
        CommonModule
    ],
    providers: [],
    bootstrap: [],
    exports: [
        PesoChilenoPipe,
        UtmPipe
    ]
  })
  export class SharedModule { }