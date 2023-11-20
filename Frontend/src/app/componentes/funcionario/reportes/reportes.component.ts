import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Deudor } from 'src/app/modelos/deudor';
import { DeclaracionService } from 'src/app/servicios/declaracion.service';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

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

  declaracionesMensuales: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  nroDecProblemas: number = 0;
  nroDeudoresPostergacion: number = 0;
  nroDeclaracionesEntregadas: number = 0;
  nroDeclaracionesFinalizadas: number = 0;
  totalDeclaracionesEntregadas: number = 0;
  nroDeclaracionesCorreccion: number = 0;
  nroDeclaracionesSinRevisar: number = 0;

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Pie
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value: any, ctx: any) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'],
    datasets: [
      {
        data: [300, 500, 100],
      },
    ],
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];
  public barChartData: ChartData<'bar'> = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      { data: this.declaracionesMensuales, label: 'Declaraciones Entregadas' ,  backgroundColor: 'rgba(185, 214, 200, 0.75)'},
      
    ],
  };;

  constructor(private declaracionService: DeclaracionService) { }

  ngOnInit(): void {
    this.obtenerDatosGrafico();
    this.obtenerDeudoresConDeclaracionesPendientes();
    this.obtenerDeudoresConDeclaracionesFinalizadas();
    this.obtenerDeudoresConDeclaracionesIncompletas();
    this.obtenerDeudoresConPostergacion();
    this.dataSource1 = new MatTableDataSource();
    this.dataSource2 = new MatTableDataSource();
    this.dataSource3 = new MatTableDataSource();
    this.dataSource4 = new MatTableDataSource();
  }

  obtenerDatosGrafico(){
    let fecha = new Date();
    let year = fecha.getFullYear();

    this.declaracionService.obtenerDatosGrafico(year).subscribe({
      next: result =>{
        result.declaraciones_mensuales.forEach(mes=>{
          
          this.declaracionesMensuales.splice(mes.mes-1, 0, mes.total);
        });

        this.nroDeclaracionesEntregadas = result.nro_declaraciones;
        this.nroDeclaracionesSinRevisar = result.declaraciones_sin_revisar;
        this.chart?.update();
      }, 
      error: result =>{
        console.log(result);
      }
    });
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
        this.nroDeclaracionesCorreccion = result.cantidad;
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
        this.nroDeudoresPostergacion = result.cantidad;
        this.dataSource4.data = result.deudores;
      }, 
      error: result =>{
        console.log(result);
      }
    });
  }

}
