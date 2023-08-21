import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';

@Component({
  selector: 'app-inicio-funcionario',
  templateUrl: './inicio-funcionario.component.html',
  styleUrls: ['./inicio-funcionario.component.css']
})
export class InicioFuncionarioComponent implements OnInit {
  nombre: string;

  constructor(private router: Router, private auth: InicioSesionService) { }

  ngOnInit(): void {
    this.nombre = this.auth.obtenerNombreUsuario()!;
  }

  listarDeudores(){
    this.router.navigate(['/home-funcionario/deudores']);
  }

  listarFuncionarios(){
    this.router.navigate(['/home-funcionario/funcionarios']);
  }

  listarDeclaracionesSinRevisar(){
    this.router.navigate(['/home-funcionario/declaraciones/revisar/pendientes']);
  }

  listarDeclaracionesEnRevision(){
    this.router.navigate(['/home-funcionario/declaraciones/revisar/en_revision']);
  }

  listarDeclaracionesEnCorreccion(){
    this.router.navigate(['/home-funcionario/declaraciones/revisar/en_correccion']);
  }

  listarUTM(){
    this.router.navigate(['/home-funcionario/utm']);
  }

  listarDevolucionesSinRevisar(){
    this.router.navigate(['/home-funcionario/funcionario/devoluciones/sin_revisar']);
  }

  listarPostergacionesSinRevisar(){
    this.router.navigate(['/home-funcionario/funcionario/postergaciones/sin_revisar']);
  }

  listarPostergacionesRevisadas(){
    this.router.navigate(['/home-funcionario/funcionario/postergaciones/revisadas']);
  }

  listarDevolucionesRevisadas(){
    this.router.navigate(['/home-funcionario/funcionario/devoluciones/revisadas']);
  }

  reportes(){
    this.router.navigate(['/home-funcionario/reportes']);
  }

  cerrarSesion(){
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
