import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms'

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  form_deudor : FormGroup;
  form_funcionario : FormGroup;
  hide_deudor = true;
  hide_funcionario = true;

  constructor() { 
    this.form_deudor = new FormGroup({
      'rut_deudor': new FormControl(""),
      'contrasena_deudor': new FormControl("")
    });

    this.form_funcionario = new FormGroup({
      'rut_funcionario': new FormControl(""),
      'contrasena_funcionario': new FormControl("")
    });
  }

  login_deudor(){
    console.log(this.form_deudor.value);
  }

  login_funcionario(){
    console.log(this.form_funcionario.value);
  }

  ngOnInit(): void {
  }

}
