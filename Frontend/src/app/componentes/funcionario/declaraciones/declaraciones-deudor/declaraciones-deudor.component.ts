import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { Declaracion } from 'src/app/modelos/declaracion';
import { DeclaracionService } from 'src/app/servicios/declaracion.service';

@Component({
  selector: 'app-declaraciones-deudor',
  templateUrl: './declaraciones-deudor.component.html',
  styleUrls: ['./declaraciones-deudor.component.css']
})
export class DeclaracionesDeudorComponent implements OnInit {
  displayedColumns: string[] = ['anio', 'total_ingresos', 'total_ingresos_utm', 'estado', 'acciones'];
  dataSource: MatTableDataSource<Declaracion>;

  constructor(private router: Router, private declaracionService: DeclaracionService) { }

  ngOnInit(): void {
    //this.obtenerDeclaracionesDeudor();
    this.dataSource = new MatTableDataSource();
  }

  obtenerDeclaracionesDeudor(rut_deudor: string){
    this.declaracionService.obtenerDeclaracionesDeudor(rut_deudor).subscribe({
      next: (result) => {this.dataSource.data = result;},
      error: (err) => {console.log(err)}
    });
  }

  verDatosDeclaracion(id_declaracion: string){
    console.log(id_declaracion);
    this.router.navigate(['/home-funcionario/declaracion']);
  }

}
