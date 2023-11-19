import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-subir-declaracion',
  templateUrl: './subir-declaracion.component.html',
  styleUrls: ['./subir-declaracion.component.css']
})
export class SubirDeclaracionComponent {
  rutDeudor: string;
  idDeclaracion: string;
  declaracionFirmada: File;

  constructor(public dialogRef: MatDialogRef<SubirDeclaracionComponent>, @Inject(MAT_DIALOG_DATA) data: any){
    this.rutDeudor = data.rutDeudor;
    this.idDeclaracion = data.idDeclaracion;
    this.declaracionFirmada = data.declaracion_firmada;
  }

  cerrar(){
    this.dialogRef.close();
  }

  actualizarDocumento(){
    this.dialogRef.close({ declaracion: this.declaracionFirmada });
  }
}
