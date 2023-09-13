import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { DeclaracionService } from 'src/app/servicios/declaracion.service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-registrar-utm',
  templateUrl: './registrar-utm.component.html',
  styleUrls: ['./registrar-utm.component.css']
})
export class RegistrarUtmComponent implements OnInit {
  valorUtm: UntypedFormGroup;
  registrar: boolean = true;
  manual: boolean = false;

  constructor(private declaracionService: DeclaracionService, 
    public dialogRef: MatDialogRef<RegistrarUtmComponent>, @Inject(MAT_DIALOG_DATA) data: any) {

      if(data.registrar == true){
        this.registrar = true;

        this.valorUtm = new UntypedFormGroup({
          'year': new UntypedFormControl(""),
          'enero': new UntypedFormControl(0),
          'febrero': new UntypedFormControl(0),
          'marzo': new UntypedFormControl(0),
          'abril': new UntypedFormControl(0),
          'mayo': new UntypedFormControl(0),
          'junio': new UntypedFormControl(0),
          'julio': new UntypedFormControl(0),
          'agosto': new UntypedFormControl(0),
          'septiembre': new UntypedFormControl(0),
          'octubre': new UntypedFormControl(0),
          'noviembre': new UntypedFormControl(0),
          'diciembre': new UntypedFormControl(0)
        });
      }
      else{
        this.registrar = false;
        this.manual = true;

        this.valorUtm = new UntypedFormGroup({
          'year': new UntypedFormControl(data.utm.year),
          'enero': new UntypedFormControl(data.utm.enero),
          'febrero': new UntypedFormControl(data.utm.febrero),
          'marzo': new UntypedFormControl(data.utm.marzo),
          'abril': new UntypedFormControl(data.utm.abril),
          'mayo': new UntypedFormControl(data.utm.mayo),
          'junio': new UntypedFormControl(data.utm.junio),
          'julio': new UntypedFormControl(data.utm.julio),
          'agosto': new UntypedFormControl(data.utm.agosto),
          'septiembre': new UntypedFormControl(data.utm.septiembre),
          'octubre': new UntypedFormControl(data.utm.octubre),
          'noviembre': new UntypedFormControl(data.utm.noviembre),
          'diciembre': new UntypedFormControl(data.utm.diciembre)
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
