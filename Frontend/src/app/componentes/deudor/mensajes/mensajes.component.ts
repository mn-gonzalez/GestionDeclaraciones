import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/modelos/mensaje';
import {FormBuilder, UntypedFormGroup,UntypedFormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
  formulario_mensaje: UntypedFormGroup;

  conversaciones: string[] = ["Declaracion Jurada 2021","Solicitud de postergacion 2019",
  "Declaracion Jurada 2020","Declaracion Jurada 2019"];

  mensajes: Mensaje[] = [
    {id: 1, remitente: "18892403", destinatario:"13950244", mensaje: "hola, tengo una consulta",
    fecha: new Date("09/09/2021"), ref_conversacion: 1},
    {id: 2, remitente: "13950244", destinatario:"18892403", mensaje: "Cual es su consulta?",
    fecha: new Date("09/09/2021"), ref_conversacion: 1},
  ];


  constructor() {
    this.formulario_mensaje = new UntypedFormGroup({
      'id': new UntypedFormControl(""),
      'remitente': new UntypedFormControl(""),
      'destinatario': new UntypedFormControl(""),
      'mensaje': new UntypedFormControl(""),
      'fecha': new UntypedFormControl(""),
      'ref_conversacion': new UntypedFormControl("")
    });
   }

  ngOnInit(): void {
  }

}
