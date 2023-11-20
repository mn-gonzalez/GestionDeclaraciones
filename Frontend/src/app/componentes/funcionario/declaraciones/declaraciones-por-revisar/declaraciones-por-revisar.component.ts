import { Component, OnInit } from '@angular/core';
import { DeclaracionService } from "src/app/servicios/declaracion.service";
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { MatTableDataSource } from '@angular/material/table';
import { Declaracion } from 'src/app/modelos/declaracion';
import { Router } from '@angular/router';
import { EstadoDeclaracion } from 'src/app/modelos/enums/estadosDeclaracion';

@Component({
  selector: 'app-declaraciones-por-revisar',
  templateUrl: './declaraciones-por-revisar.component.html',
  styleUrls: ['./declaraciones-por-revisar.component.css']
})
export class DeclaracionesPorRevisarComponent implements OnInit {

  displayedColumns: string[] = ['rut', 'nombres', 'ap_paterno', 'ap_materno','anio', 
    'total_ingresos', 'total_ingresos_utm', 'cuota_preliminar', 'acciones'];
  dataSource: MatTableDataSource<Declaracion>;

  constructor(private declaracionService: DeclaracionService, private auth: InicioSesionService,
    private router: Router) { 
      

    }

  ngOnInit(): void {
    this.obtenerDeclaracionesSinRevisar();
    this.dataSource = new MatTableDataSource();
  }

  obtenerDeclaracionesSinRevisar(){
    this.declaracionService.obtenerDeclaracionesSegunEstado(EstadoDeclaracion.POR_REVISAR).subscribe({
      next: (result) => {
        console.log(result);
        this.dataSource.data = result;
      },
      error: (err) => {console.log(err)}
    });

  }

  //Asocia la declaracion que se va a revisar con el funcionario que solicito revisar la declaracion y 
  //cre un registro en la base de datos
  revisarDeclaracion(rut_deudor: string, id_declaracion: string){
    let rut_funcionario = this.auth.obtenerUsuarioActual()!;
    let comentarios = "";
    let fecha = this.declaracionService.obtenerFechaActual();

    this.declaracionService.actualizarEstadoDeclaracion(rut_deudor, id_declaracion, EstadoDeclaracion.EN_REVISION).subscribe({
      next: result =>{
        this.declaracionService.mostrarNotificacion("La revisión de la declaración se ha asociado a usted", "Cerrar");
      }
    });

    this.declaracionService.registrarRevision(rut_funcionario, id_declaracion, 
      fecha, comentarios, "EN REVISION").subscribe({
      next: result =>{
        this.router.navigate(['/funcionario/declaraciones/revisar/'+id_declaracion]);
      }
    });
  }

}
