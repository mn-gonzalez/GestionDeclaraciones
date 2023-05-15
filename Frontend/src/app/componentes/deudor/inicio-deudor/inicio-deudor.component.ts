import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-deudor',
  templateUrl: './inicio-deudor.component.html',
  styleUrls: ['./inicio-deudor.component.css']
})
export class InicioDeudorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  registrarDeclaracion(){
    this.router.navigate(['/home-deudor']);
  }

  listarDeclaracion(){
    this.router.navigate(['/home-deudor/declaraciones']);
  }

  solicitarDevolucion(){
    this.router.navigate(['/home-deudor/devolucion']);
  }

  listarDevoluciones(){
    this.router.navigate(['/home-deudor/devoluciones']);
  }

  misDatos(){
    this.router.navigate(['/home-deudor/mis-datos']);
  }

  solicitarPostergacion(){
    this.router.navigate(['/home-deudor/postergacion']);
  }

  listarPostergaciones(){
    this.router.navigate(['/home-deudor/postergaciones']);
  }

}
