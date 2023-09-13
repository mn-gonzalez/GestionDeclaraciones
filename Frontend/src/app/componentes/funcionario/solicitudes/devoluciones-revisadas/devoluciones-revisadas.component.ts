import { Component, OnInit } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Router } from '@angular/router';
import { Devolucion } from 'src/app/modelos/devolucion';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

@Component({
  selector: 'app-devoluciones-revisadas',
  templateUrl: './devoluciones-revisadas.component.html',
  styleUrls: ['./devoluciones-revisadas.component.css']
})
export class DevolucionesRevisadasComponent implements OnInit {
  displayedColumns: string[] = ['rut', 'nombres', 'ap_paterno', 'ap_materno', 'fecha', 'estado', 'acciones'];
  dataSource: MatTableDataSource<Devolucion>;
  rut_funcionario: string;
  
  constructor(private solicitudService: SolicitudService, private router: Router, private auth: InicioSesionService) { 

  }

  ngOnInit(): void {
    this.rut_funcionario = this.auth.obtenerUsuarioActual()!;
    this.obtenerDevolucionesRevisadas();
    this.dataSource = new MatTableDataSource();
  }

  detallesDevolucion(id_devolucion: string){
    this.router.navigate(['/home-funcionario/funcionario/devoluciones/revisadas/'+id_devolucion]);
  }

  obtenerDevolucionesRevisadas(){
    this.solicitudService.obtenerDevolucionesRevisadas(this.rut_funcionario).subscribe({
      next: (result) => {
        result.forEach(devolucion=>{
          devolucion.estado_text = this.solicitudService.convertirEstadoATexto(devolucion.estado);
        });

        this.dataSource.data = result;
      },
      error: (err) => {console.log(err)}
    });
  }

}
