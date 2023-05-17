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

  listaDeudores(){
    this.router.navigate(['/home-funcionario/deudores']);
  }

  listaFuncionarios(){
    this.router.navigate(['/home-funcionario/funcionarios']);
  }

  listaDeclaracionesSinRevisar(){
    this.router.navigate(['/home-funcionario/declaraciones/revisar/pendientes']);
  }

  listaDeclaracionesEnRevision(){
    this.router.navigate(['/home-funcionario/declaraciones/revision']);
  }

  listarDeclaracionesEnCorreccion(){
    this.router.navigate(['/home-funcionario/declaraciones/correccion']);
  }

  listaUTM(){
    this.router.navigate(['/home-funcionario/utm']);
  }

  listarDevolucionesSinRevisar(){
    this.router.navigate(['/home-funcionario/devoluciones/revisar']);
  }

  listarPostergacionesSinRevisar(){
    this.router.navigate(['/home-funcionario/postergaciones/revisar']);
  }

}
