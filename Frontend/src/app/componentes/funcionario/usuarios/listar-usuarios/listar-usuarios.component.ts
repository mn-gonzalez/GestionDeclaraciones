import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { Router } from '@angular/router';

export interface Deudor {
  rut: string;
  nombres: string;
  ap_paterno: string;
  ap_materno: string;
}

const ELEMENT_DATA: Deudor[] = [
  {rut: "18892403", nombres: 'MANUEL NICOLAS', ap_paterno: "GONZALEZ", ap_materno: 'GUERRERO'},
  {rut: "17753612", nombres: 'RAMON ALBERTO', ap_paterno: "SALINAS", ap_materno: 'AGUILERA'},
  {rut: "17250408", nombres: 'MARCIA ALEJANDRA', ap_paterno: "MARTINEZ", ap_materno: 'ROSALES'},
  {rut: "16679487", nombres: 'BARBARA LORENA', ap_paterno: "FIGUEROA", ap_materno: 'MORALES'},
  {rut: "17185566", nombres: 'CRISTIAN ALEXIS', ap_paterno: "PALMA", ap_materno: 'CORREA'},
  {rut: "18005249", nombres: 'NATALY ISABEL', ap_paterno: "RIOS", ap_materno: 'JAMET'},
  {rut: "16907594", nombres: 'BRENDA NATHALY', ap_paterno: "GARRIDO", ap_materno: 'ROCO'},
  {rut: "18252721", nombres: 'DIEGO ABRAHAM', ap_paterno: "LAGOS", ap_materno: 'VELIZ'},
  {rut: "17669748", nombres: 'DIEGO EDUARDO', ap_paterno: "SAN MARTIN", ap_materno: 'CARVAJAL'},
  {rut: "17854287", nombres: 'MARIA PAZ', ap_paterno: "CANALES", ap_materno: 'SANHUEZA'},
];

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  displayedColumns: string[] = ['rut', 'nombres', 'ap_paterno', 'ap_materno', 'acciones'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  busqueda : FormGroup;

  constructor(private router: Router) {
    this.busqueda = new FormGroup({
      'filtro': new FormControl("")
    });
   }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }

  submit(){

  }

  verDeclaracionesDeudor(rut: string){
    console.log(rut);
    this.router.navigate(['/home-funcionario/declaraciones']);
  }

}
