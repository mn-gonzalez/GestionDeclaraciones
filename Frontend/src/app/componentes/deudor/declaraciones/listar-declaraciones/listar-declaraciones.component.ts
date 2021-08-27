import { Component, OnInit } from '@angular/core';
import { DeclaracionService } from "src/app/servicios/declaracion.service";
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { MatTableDataSource } from '@angular/material/table';
import { Declaracion } from 'src/app/modelos/declaracion';

@Component({
  selector: 'app-listar-declaraciones',
  templateUrl: './listar-declaraciones.component.html',
  styleUrls: ['./listar-declaraciones.component.css']
})
export class ListarDeclaracionesComponent implements OnInit {
  displayedColumns: string[] = ['anio', 'total_ingresos', 'total_ingresos_utm', 'estado', 'acciones'];
  dataSource: MatTableDataSource<Declaracion>;

  constructor(private declaracionService: DeclaracionService, private auth: InicioSesionService) { }

  ngOnInit(): void {
    this.obtener_declaraciones_deudor();
    this.dataSource = new MatTableDataSource();
  }

  obtener_declaraciones_deudor(){
    let rut_deudor = this.auth.informacion_token().rut;

    this.declaracionService.obtenerDeclaracionesDeudor(rut_deudor).subscribe({
      next: (result) => {this.dataSource.data = result;},
      error: (err) => {console.log(err)}
    });

  }

  verDatosDeclaracion(id_declaracion: string){
    console.log(id_declaracion);
    //this.router.navigate(['/home-funcionario/declaracion']);
  }

  verFormularioPDF(id_declaracion: string){
    console.log("Ver formulario en formato PDF");
  }
}
