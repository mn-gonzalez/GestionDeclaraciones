import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';

interface Ruta{
  nombre: string;
  enlace: string;
  estaActiva: boolean;
}

@Component({
  selector: 'app-inicio-deudor',
  templateUrl: './inicio-deudor.component.html',
  styleUrls: ['./inicio-deudor.component.css']
})
export class InicioDeudorComponent implements OnInit {
  nombre: string;
  rutas: Ruta[] = [
    {nombre: "Mis Datos", enlace: '/deudor/mis-datos', estaActiva: false},
    {nombre: "Registrar Declaración Jurada", enlace: '/deudor/menu-declaracion', estaActiva: false},
    {nombre: "Historial de Declaraciones Juradas", enlace: '/deudor/declaraciones', estaActiva: false},
    {nombre: "Solicitar Postergación de Cobro", enlace: '/deudor/postergacion', estaActiva: false},
    {nombre: "Historial de Postergaciones de Cobro", enlace: '/deudor/postergaciones', estaActiva: false},
    {nombre: "Solicitar Devolución de Pagarés", enlace: '/deudor/devolucion', estaActiva: false},
    {nombre: "Historial de Devoluciones de Pagarés", enlace: '/deudor/devoluciones', estaActiva: false},
  ];

  constructor(private router: Router, private auth: InicioSesionService) { }

  ngOnInit(): void {
    this.nombre = this.auth.obtenerNombreUsuario()!;
  }

  menuSeleccionado(ruta: string){
    this.router.navigate([ruta]);
  }

  cerrarSesion(){
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
