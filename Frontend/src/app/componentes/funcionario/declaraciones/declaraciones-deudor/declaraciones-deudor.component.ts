import { Component, OnInit } from '@angular/core';
import {MatLegacyTableDataSource as MatTableDataSource} from '@angular/material/legacy-table';
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
  nombres: string;
  ap_paterno: string;
  ap_materno: string;

  constructor(private router: Router, private declaracionService: DeclaracionService, 
    private activatedRoute: ActivatedRoute) { 

    }

  ngOnInit(): void {
    this.rut_deudor = this.activatedRoute.snapshot.paramMap.get('rut') || "";
    this.obtenerDatosDeudor();
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
          declaracion.estado_text = "POR REVISAR";
          break;
        }

        case 3:{
          declaracion.estado_text = "EN REVISIÓN";
          break;
        }

        case 4:{
          declaracion.estado_text = "EN CORRECCIÓN"
          break;
        }
        
        case 5:{
          declaracion.estado_text = "COMPLETADA";
          break;
        }
      }
    });
  }

  obtenerDatosDeudor(){
    this.declaracionService.obtenerDatosDeudor(this.rut_deudor).subscribe({
      next: result =>{
        this.nombres = result.nombres;
        this.ap_paterno = result.ap_paterno;
        this.ap_paterno = result.ap_materno;
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
    this.router.navigate(['/home-funcionario/declaracion/'+id_declaracion]);
  }

}
