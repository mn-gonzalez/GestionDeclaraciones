import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DeclaracionService } from 'src/app/servicios/declaracion.service';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registrar-utm',
  templateUrl: './registrar-utm.component.html',
  styleUrls: ['./registrar-utm.component.css']
})
export class RegistrarUtmComponent implements OnInit {
  valorUtm: FormGroup;
  registrar: boolean = true;
  manual: boolean = false;

  constructor(private declaracionService: DeclaracionService, 
    public dialogRef: MatDialogRef<RegistrarUtmComponent>, @Inject(MAT_DIALOG_DATA) data: any) {

      if(data.registrar == true){
        this.registrar = true;

        this.valorUtm = new FormGroup({
          'year': new FormControl(""),
          'enero': new FormControl(0),
          'febrero': new FormControl(0),
          'marzo': new FormControl(0),
          'abril': new FormControl(0),
          'mayo': new FormControl(0),
          'junio': new FormControl(0),
          'julio': new FormControl(0),
          'agosto': new FormControl(0),
          'septiembre': new FormControl(0),
          'octubre': new FormControl(0),
          'noviembre': new FormControl(0),
          'diciembre': new FormControl(0)
        });
      }
      else{
        this.registrar = false;
        this.manual = true;

        this.valorUtm = new FormGroup({
          'year': new FormControl(data.utm.year),
          'enero': new FormControl(data.utm.enero),
          'febrero': new FormControl(data.utm.febrero),
          'marzo': new FormControl(data.utm.marzo),
          'abril': new FormControl(data.utm.abril),
          'mayo': new FormControl(data.utm.mayo),
          'junio': new FormControl(data.utm.junio),
          'julio': new FormControl(data.utm.julio),
          'agosto': new FormControl(data.utm.agosto),
          'septiembre': new FormControl(data.utm.septiembre),
          'octubre': new FormControl(data.utm.octubre),
          'noviembre': new FormControl(data.utm.noviembre),
          'diciembre': new FormControl(data.utm.diciembre)
        });
      }
  }

  ngOnInit(): void {

  }

  registrarUTM(){
    let datos = this.valorUtm.value;

    if(this.manual == true){
      this.declaracionService.registrarUtm(datos).subscribe({
        next: result =>{
          this.declaracionService.mostrarNotificacion(result, "Cerrar");
          this.dialogRef.close();
        }, 
        error: result =>{
        }
      });
    }
    else{
      this.declaracionService.registrarUtmAutomatico(datos.year).subscribe({
        next: result =>{
          this.declaracionService.mostrarNotificacion(result, "Cerrar");
          this.dialogRef.close();
        }, 
        error: result =>{
        }
      });
    }
    
  }

  actualizarUTM(){
    let datos = this.valorUtm.value;

    this.declaracionService.actualizarUtm(datos).subscribe({
      next: result =>{
        this.declaracionService.mostrarNotificacion(result, "Cerrar");
        this.dialogRef.close();
      }, 
      error: result =>{
      }
    });
  }

  cerrar(){
    this.dialogRef.close();
  }
}
