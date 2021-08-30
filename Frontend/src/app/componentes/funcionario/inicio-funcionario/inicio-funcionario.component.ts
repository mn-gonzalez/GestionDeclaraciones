import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-funcionario',
  templateUrl: './inicio-funcionario.component.html',
  styleUrls: ['./inicio-funcionario.component.css']
})
export class InicioFuncionarioComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  listaDeudores(){
    this.router.navigate(['/home-funcionario/']);
  }

  listaDeclaraciones(){
    console.log("lista de declaraciones");
  }

}
