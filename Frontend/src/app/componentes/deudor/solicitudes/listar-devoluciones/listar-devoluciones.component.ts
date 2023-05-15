import { Component, OnInit } from '@angular/core';
import { SolicitudService } from "src/app/servicios/solicitud.service";
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { MatTableDataSource } from '@angular/material/table';
import { Devolucion } from 'src/app/modelos/devolucion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-devoluciones',
  templateUrl: './listar-devoluciones.component.html',
  styleUrls: ['./listar-devoluciones.component.css']
})
export class ListarDevolucionesComponent implements OnInit {

  displayedColumns: string[] = ['fecha', 'tipo_deuda', 'solicitud', 'estado', 'acciones'];
  dataSource: MatTableDataSource<Devolucion>;

  constructor(private solicitudService: SolicitudService, private auth: InicioSesionService, private router: Router) {

  }

  ngOnInit(): void {
    this.obtener_devoluciones_deudor();
    this.dataSource = new MatTableDataSource();
  }

  obtener_devoluciones_deudor(){
    let rut_deudor = this.auth.obtenerUsuarioActual()!;

    this.solicitudService.obtenerDevoluciones(rut_deudor).subscribe({
      next: (result) => {
        this.dataSource.data = result;
        this.convertirEstado();
      },
      error: (err) => {console.log(err)}
    });
  }

  convertirEstado(){
    this.dataSource.data.forEach(devolucion =>{
      switch(devolucion.estado){
        case 1:{
          devolucion.estado_text = "POR REVISAR";
          break;
        }

        case 2:{
          devolucion.estado_text = "EN REVISION";
          break;
        }

        case 3:{
          devolucion.estado_text = "ACEPTADA";
          break;
        }
        
        case 4:{
          devolucion.estado_text = "RECHAZADA";
          break;
        }
      }
    });
  }

  verDatosDevolucion(id_devolucion: string){
    this.router.navigate(['/home-deudor/devoluciones/'+id_devolucion]);
  }
}
