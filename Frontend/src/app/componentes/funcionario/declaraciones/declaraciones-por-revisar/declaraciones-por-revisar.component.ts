import { Component, OnInit } from '@angular/core';
import { DeclaracionService } from "src/app/servicios/declaracion.service";
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { MatTableDataSource } from '@angular/material/table';
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
    this.declaracionService.obtenerDeclaracionesSinRevisar().subscribe({
      next: (result) => {
        console.log(result);
        this.dataSource.data = result;
      },
      error: (err) => {console.log(err)}
    });

  }

  revisarDeclaracion(id_declaracion: string){
    //realizar operaciones para que la revision de la declaracion quede asignada al funcionario
    this.router.navigate(['/home-funcionario/declaraciones/revisar/'+id_declaracion]);
  }

}
