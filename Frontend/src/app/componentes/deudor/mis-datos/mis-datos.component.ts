import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.css']
})
export class MisDatosComponent implements OnInit {
  datosPersonales: FormGroup;

  constructor() {
    this.datosPersonales = new FormGroup({
      'rut': new FormControl(""),
      'nombres': new FormControl(""),
      'ap_paterno': new FormControl(""),
      'ap_materno': new FormControl(""),
      'direccion': new FormControl(""),
      'telefono': new FormControl(""),
      'correo': new FormControl(""),
      'contrasena': new FormControl("")
    });
  }

  ngOnInit(): void {
  }

  obtener_datos(){

  }

}
