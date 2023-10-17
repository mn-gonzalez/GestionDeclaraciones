import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/modelos/mensaje';
import {FormBuilder, FormGroup,FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent implements OnInit {
  formulario_mensaje: FormGroup;

  conversaciones: string[] = ["Declaracion Jurada 2021","Solicitud de postergacion 2019",
  "Declaracion Jurada 2020","Declaracion Jurada 2019"];

  mensajes: Mensaje[] = [
    {id: 1, remitente: "18892403", destinatario:"13950244", mensaje: "hola, tengo una consulta",
    fecha: new Date("09/09/2021"), ref_conversacion: 1},
    {id: 2, remitente: "13950244", destinatario:"18892403", mensaje: "Cual es su consulta?",
    fecha: new Date("09/09/2021"), ref_conversacion: 1},
  ];


  constructor() {
    this.formulario_mensaje = new FormGroup({
      'id': new FormControl(""),
      'remitente': new FormControl(""),
      'destinatario': new FormControl(""),
      'mensaje': new FormControl(""),
      'fecha': new FormControl(""),
      'ref_conversacion': new FormControl("")
    });
   }

  ngOnInit(): void {
  }

}
