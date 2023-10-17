import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-subir-declaracion',
  templateUrl: './subir-declaracion.component.html',
  styleUrls: ['./subir-declaracion.component.css']
})
export class SubirDeclaracionComponent {
  rutDeudor: string;
  idDeclaracion: string;
  declaracionFirmada: File;

  constructor(public dialogRef: MatDialogRef<SubirDeclaracionComponent>){

  }

  cerrar(){
    this.dialogRef.close();
  }
}
