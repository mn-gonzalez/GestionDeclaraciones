import { Component, OnInit } from '@angular/core';
import { Postergacion } from 'src/app/modelos/postergacion';
import { SolicitudService } from "src/app/servicios/solicitud.service";
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-postergaciones',
  templateUrl: './listar-postergaciones.component.html',
  styleUrls: ['./listar-postergaciones.component.css']
})
export class ListarPostergacionesComponent implements OnInit {

  displayedColumns: string[] = ['fecha', 'estado', 'acciones'];
  dataSource: MatTableDataSource<Postergacion>;

  constructor(private solicitudService: SolicitudService, private auth: InicioSesionService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerPostergacionesDeudor();
    this.dataSource = new MatTableDataSource();
  }

  obtenerPostergacionesDeudor(){
    let rut_deudor = this.auth.obtenerUsuarioActual()!;

    this.solicitudService.obtenerPostergaciones(rut_deudor).subscribe({
      next: (result) => {
        this.dataSource.data = result;
        this.convertirEstado();
      },
      error: (err) => {console.log(err)}
    });
  }

  convertirEstado(){
    this.dataSource.data.forEach(postergacion =>{
      switch(postergacion.estado){
        case 1:{
          postergacion.estado_text = "POR REVISAR";
          break;
        }

        case 2:{
          postergacion.estado_text = "EN REVISION";
          break;
        }

        case 3:{
          postergacion.estado_text = "ACEPTADA";
          break;
        }
        
        case 4:{
          postergacion.estado_text = "RECHAZADA";
          break;
        }
      }
    });
  }

  verDatosPostergacion(id_postergacion: string){
    this.router.navigate(['/home-deudor/postergaciones/'+id_postergacion]);
  }

}
