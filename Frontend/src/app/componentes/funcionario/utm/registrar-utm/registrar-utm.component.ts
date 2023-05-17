import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DeclaracionService } from 'src/app/servicios/declaracion.service';

@Component({
  selector: 'app-registrar-utm',
  templateUrl: './registrar-utm.component.html',
  styleUrls: ['./registrar-utm.component.css']
})
export class RegistrarUtmComponent implements OnInit {
  valorUtm: FormGroup;
  
  constructor(private declaracionService: DeclaracionService, public dialogRef: MatDialogRef<RegistrarUtmComponent>) {

    this.valorUtm = new FormGroup({
      'year': new FormControl(""),
      'enero': new FormControl(""),
      'febrero': new FormControl(""),
      'marzo': new FormControl(""),
      'abril': new FormControl(""),
      'mayo': new FormControl(""),
      'junio': new FormControl(""),
      'julio': new FormControl(""),
      'agosto': new FormControl(""),
      'septiembre': new FormControl(""),
      'octubre': new FormControl(""),
      'noviembre': new FormControl(""),
      'diciembre': new FormControl("")
    });
   }

  ngOnInit(): void {

  }

  registrarUTM(){
    let datos = this.valorUtm.value;

    this.declaracionService.registrarUtm(datos).subscribe({
      next: result =>{
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
