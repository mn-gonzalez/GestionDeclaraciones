import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { Declaracion } from 'src/app/modelos/declaracion';
import { DeclaracionService } from 'src/app/servicios/declaracion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-declaraciones-deudor',
  templateUrl: './declaraciones-deudor.component.html',
  styleUrls: ['./declaraciones-deudor.component.css']
})
export class DeclaracionesDeudorComponent implements OnInit {
  displayedColumns: string[] = ['anio', 'total_ingresos', 'total_ingresos_utm', 'cuota_preliminar', 'estado', 'acciones'];
  dataSource: MatTableDataSource<Declaracion>;
  rut_deudor: string;

  constructor(private router: Router, private declaracionService: DeclaracionService, 
    private activatedRoute: ActivatedRoute) { 

    }

  ngOnInit(): void {
    this.rut_deudor = this.activatedRoute.snapshot.paramMap.get('rut') || "";
    this.obtenerDeclaracionesDeudor(this.rut_deudor);
    this.dataSource = new MatTableDataSource();
  }

  convertirEstado(){
    this.dataSource.data.forEach(declaracion =>{
      switch(declaracion.estado){
        case 1:{
          declaracion.estado_text = "PENDIENTE";
          break;
        }

        case 2:{
          declaracion.estado_text = "EN REVISION";
          break;
        }
        
        case 3:{
          declaracion.estado_text = "COMPLETADA";
          break;
        }
      }
    });
  }

  obtenerDeclaracionesDeudor(rut_deudor: string){
    this.declaracionService.obtenerDeclaracionesDeudor(rut_deudor).subscribe({
      next: (result) => {
        this.dataSource.data = result;
        this.convertirEstado();
      },
      error: (err) => {console.log(err)}
    });
  }

  verDatosDeclaracion(id_declaracion: string){
    console.log(id_declaracion);
    this.router.navigate(['/home-funcionario/declaracion/'+id_declaracion]);
  }

}
