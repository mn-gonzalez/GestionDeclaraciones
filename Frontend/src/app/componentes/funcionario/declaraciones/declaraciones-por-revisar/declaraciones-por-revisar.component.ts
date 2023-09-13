import { Component, OnInit } from '@angular/core';
import { DeclaracionService } from "src/app/servicios/declaracion.service";
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Declaracion } from 'src/app/modelos/declaracion';
import { Router } from '@angular/router';

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
    let sinRevisar = 2;

    this.declaracionService.obtenerDeclaracionesSegunEstado(sinRevisar).subscribe({
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

    this.declaracionService.actualizarEstadoDeclaracion(rut_deudor, id_declaracion, 3).subscribe({
      next: result =>{
        console.log(result);
      }
    });

    this.declaracionService.registrarRevision(rut_funcionario, id_declaracion, 
      fecha, comentarios, "EN REVISION").subscribe({
      next: result =>{
        this.router.navigate(['/home-funcionario/declaraciones/revisar/'+id_declaracion]);
      }
    });
  }

}
