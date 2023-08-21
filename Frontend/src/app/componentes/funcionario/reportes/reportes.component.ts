import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Deudor } from 'src/app/modelos/deudor';
import { DeclaracionService } from 'src/app/servicios/declaracion.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  year: number;
  displayedColumns: string[] = ['rut', 'nombres', 'ap_paterno', 'ap_materno'];
  dataSource1: MatTableDataSource<Deudor>;
  dataSource2: MatTableDataSource<Deudor>;
  dataSource3: MatTableDataSource<Deudor>;
  dataSource4: MatTableDataSource<Deudor>;

  constructor(private declaracionService: DeclaracionService) { }

  ngOnInit(): void {
    this.obtenerDeudoresConDeclaracionesPendientes();
    this.obtenerDeudoresConDeclaracionesFinalizadas();
    this.obtenerDeudoresConDeclaracionesIncompletas();
    this.obtenerDeudoresConPostergacion();
    this.dataSource1 = new MatTableDataSource();
    this.dataSource2 = new MatTableDataSource();
    this.dataSource3 = new MatTableDataSource();
    this.dataSource4 = new MatTableDataSource();
  }

  obtenerDeudoresConDeclaracionesPendientes(){
    let fecha = new Date();
    let year = fecha.getFullYear();

    this.declaracionService.obtenerDeudoresConDeclaracionPendiente(year).subscribe({
      next: result =>{
        this.dataSource1.data = result.deudores;
      }, 
      error: result =>{
        console.log(result);
      }
    });
  }

  obtenerDeudoresConDeclaracionesFinalizadas(){
    let fecha = new Date();
    let year = fecha.getFullYear();

    this.declaracionService.obtenerDeudoresConDeclaracionesFinalizadas(year).subscribe({
      next: result =>{
        this.dataSource2.data = result.deudores;
      }, 
      error: result =>{
        console.log(result);
      }
    });
  }

  obtenerDeudoresConDeclaracionesIncompletas(){
    let fecha = new Date();
    let year = fecha.getFullYear();

    this.declaracionService.obtenerDeudoresConDeclaracionesEnCorreccion(year).subscribe({
      next: result =>{
        this.dataSource3.data = result.deudores;
      }, 
      error: result =>{
        console.log(result);
      }
    });
  }

  obtenerDeudoresConPostergacion(){
    let fecha = new Date();
    let year = fecha.getFullYear();

    this.declaracionService.obtenerDeudoresConPostergacion(year).subscribe({
      next: result =>{
        this.dataSource4.data = result.deudores;
      }, 
      error: result =>{
        console.log(result);
      }
    });
  }

}
