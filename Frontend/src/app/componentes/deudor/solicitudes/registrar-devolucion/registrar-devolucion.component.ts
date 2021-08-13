import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-registrar-devolucion',
  templateUrl: './registrar-devolucion.component.html',
  styleUrls: ['./registrar-devolucion.component.css']
})
export class RegistrarDevolucionComponent implements OnInit {
  datosSolicitud: FormGroup;
  solicitud: string;

  constructor() {

    this.solicitud = "Solicito la devolución de los pagares correspondientes a las deudas ya detalladas, por encontrarse las deudas ya canceladas.";

    this.datosSolicitud = new FormGroup({
      'id': new FormControl(""),
      'fecha': new FormControl(""),
      'rut': new FormControl(""),
      'nombres': new FormControl(""),
      'ap_paterno': new FormControl(""),
      'ap_materno': new FormControl(""),
      'domicilio': new FormControl(""),
      'telefono': new FormControl(""),
      'correo': new FormControl(""),
      'tipo_deuda': new FormControl(""),
      'retiro_oficina': new FormControl(""),
      'solicitud': new FormControl("")
    });
   }

  ngOnInit(): void {
  }

}
