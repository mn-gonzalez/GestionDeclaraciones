import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { DeudorService } from 'src/app/servicios/deudor.service';
import { Deudor } from 'src/app/modelos/deudor';


@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  displayedColumns: string[] = ['rut', 'nombres', 'ap_paterno', 'ap_materno', 'acciones'];
  dataSource: MatTableDataSource<Deudor>;
  busqueda : FormGroup;

  constructor(private router: Router, private deudorService: DeudorService) {
    this.busqueda = new FormGroup({
      'filtro': new FormControl("")
    });
   }

  ngOnInit(): void {
    this.obtenerDeudores();
    this.dataSource = new MatTableDataSource();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }

  submit(){

  }

  obtenerDeudores(){
    this.deudorService.obtenerDeudores().subscribe({
      next: (result) => {this.dataSource.data = result;},
      error: (err) => {console.log(err)}
    });
  }

  verDeclaracionesDeudor(rut: string){
    console.log(rut);
    this.router.navigate(['/home-funcionario/declaraciones']);
  }

}
