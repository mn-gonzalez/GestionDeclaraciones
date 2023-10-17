import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';

interface Ruta{
  nombre: string;
  enlace: string;
  estaActiva: boolean;
}

@Component({
  selector: 'app-inicio-funcionario',
  templateUrl: './inicio-funcionario.component.html',
  styleUrls: ['./inicio-funcionario.component.css']
})
export class InicioFuncionarioComponent implements OnInit {
  nombre: string;

  rutas: Ruta[] = [
    {nombre: "Deudores", enlace: '/funcionario/deudores', estaActiva: false},
    {nombre: "Funcionarios", enlace: '/funcionario/funcionarios', estaActiva: false},
    {nombre: "UTM", enlace: '/funcionario/utm', estaActiva: false},
    {nombre: "Declaraciones sin revisar", enlace: '/funcionario/declaraciones/revisar/pendientes', estaActiva: false},
    {nombre: "Declaraciones en revisión", enlace: '/funcionario/declaraciones/revisar/en_revision', estaActiva: false},
    {nombre: "Declaraciones en corrección", enlace: '/funcionario/declaraciones/revisar/en_correccion', estaActiva: false},
    {nombre: "Postergaciones de cobro sin revisar", enlace: '/funcionario/funcionario/postergaciones/sin_revisar', estaActiva: false},
    {nombre: "Postergaciones de cobro revisadas", enlace: '/funcionario/funcionario/postergaciones/revisadas', estaActiva: false},
    {nombre: "Solicitudes de Pagarés Sin Revisar", enlace: '/funcionario/funcionario/devoluciones/sin_revisar', estaActiva: false},
    {nombre: "Solicitudes de Pagarés Revisadas", enlace: '/funcionario/funcionario/devoluciones/revisadas', estaActiva: false},
    {nombre: "Reportes", enlace: '/funcionario/reportes', estaActiva: false},
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
