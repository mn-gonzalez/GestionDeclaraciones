import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-inicio',
  templateUrl: './pagina-inicio.component.html',
  styleUrls: ['./pagina-inicio.component.css']
})
export class PaginaInicioComponent implements OnInit {

  constructor(private router: Router) { 

  }

  irAIniciarSesion($myParam: string = ''): void {
    const navegacion: string[] = ['/login'];
    if($myParam.length) {
      navegacion.push($myParam);
    }
    this.router.navigate(navegacion);
  }

  ngOnInit(): void {
  }

}
