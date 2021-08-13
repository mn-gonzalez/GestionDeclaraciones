import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { Router } from '@angular/router';

export interface Declaracion {
  id: string;
  anio: string;
  total_ingresos: string;
  total_ingresos_utm: string;
  estado: string;
}

const ELEMENT_DATA: Declaracion[] = [
  {id: "1", anio: "2012", total_ingresos: '0', total_ingresos_utm: "0", estado: 'COMPLETADO'},
  {id: "2", anio: "2013", total_ingresos: '0', total_ingresos_utm: "0", estado: 'COMPLETADO'},
  {id: "3", anio: "2014", total_ingresos: '0', total_ingresos_utm: "0", estado: 'COMPLETADO'},
  {id: "4", anio: "2015", total_ingresos: '0', total_ingresos_utm: "0", estado: 'COMPLETADO'},
  {id: "5", anio: "2016", total_ingresos: '0', total_ingresos_utm: "0", estado: 'COMPLETADO'},
  {id: "6", anio: "2017", total_ingresos: '0', total_ingresos_utm: "0", estado: 'COMPLETADO'},
  {id: "7", anio: "2018", total_ingresos: '0', total_ingresos_utm: "0", estado: 'COMPLETADO'},
  {id: "8", anio: "2019", total_ingresos: '0', total_ingresos_utm: "0", estado: 'COMPLETADO'},
  {id: "9", anio: "2020", total_ingresos: '0', total_ingresos_utm: "0", estado: 'COMPLETADO'},
  {id: "10", anio: "2021", total_ingresos: '0', total_ingresos_utm: "0", estado: 'PENDIENTE'},
];

@Component({
  selector: 'app-declaraciones-deudor',
  templateUrl: './declaraciones-deudor.component.html',
  styleUrls: ['./declaraciones-deudor.component.css']
})
export class DeclaracionesDeudorComponent implements OnInit {
  displayedColumns: string[] = ['anio', 'total_ingresos', 'total_ingresos_utm', 'estado', 'acciones'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  verDatosDeclaracion(id_declaracion: string){
    console.log(id_declaracion);
    this.router.navigate(['/home-funcionario/declaracion']);
  }

}
