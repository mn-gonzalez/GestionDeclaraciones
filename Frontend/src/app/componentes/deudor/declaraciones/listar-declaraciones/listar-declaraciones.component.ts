import { Component, OnInit } from '@angular/core';
import { DeclaracionService } from "src/app/servicios/declaracion.service";
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { MatTableDataSource } from '@angular/material/table';
import { Declaracion } from 'src/app/modelos/declaracion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-declaraciones',
  templateUrl: './listar-declaraciones.component.html',
  styleUrls: ['./listar-declaraciones.component.css']
})
export class ListarDeclaracionesComponent implements OnInit {
  displayedColumns: string[] = ['anio', 'total_ingresos', 'total_ingresos_utm', 'cuota_preliminar', 'estado', 'acciones'];
  dataSource: MatTableDataSource<Declaracion>;

  constructor(private declaracionService: DeclaracionService, private auth: InicioSesionService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtener_declaraciones_deudor();
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
          declaracion.estado_text = "EN CORRECCIÓN";
          break;
        }

        case 5:{
          declaracion.estado_text = "ACEPTADA";
          break;
        }
        
        case 6:{
          declaracion.estado_text = "FINALIZADA";
          break;
        }
      }
    });
  }

  obtener_declaraciones_deudor(){
    let rut_deudor = this.auth.obtenerUsuarioActual()!;

    this.declaracionService.obtenerDeclaracionesDeudor(rut_deudor).subscribe({
      next: (result) => {
        this.dataSource.data = result;
        this.convertirEstado();
      },
      error: (err) => {console.log(err)}
    });

  }

  verDatosDeclaracion(id_declaracion: string){
    this.router.navigate(['/home-deudor/declaracion/'+id_declaracion]);
  }

  verFormularioPDF(id_declaracion: string){
    console.log("Ver formulario en formato PDF");
  }
}
