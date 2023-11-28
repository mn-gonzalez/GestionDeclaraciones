import { Component, OnInit } from '@angular/core';
import { SolicitudService } from "src/app/servicios/solicitud.service";
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { MatTableDataSource } from '@angular/material/table';
import { Devolucion } from 'src/app/modelos/devolucion';
import { ActivatedRoute, Router } from '@angular/router';
import { DeclaracionService } from 'src/app/servicios/declaracion.service';

@Component({
  selector: 'app-listar-devoluciones',
  templateUrl: './listar-devoluciones.component.html',
  styleUrls: ['./listar-devoluciones.component.css']
})
export class ListarDevolucionesComponent implements OnInit {

  displayedColumns: string[] = ['fecha', 'tipo_deuda', 'solicitud', 'estado', 'acciones'];
  dataSource: MatTableDataSource<Devolucion>;
  funcionario: boolean;
  rut_deudor: string;
  nombres: string;
  ap_paterno: string;
  ap_materno: string;

  constructor(
    private solicitudService: SolicitudService, 
    private auth: InicioSesionService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private declaracionService: DeclaracionService) {

  }

  ngOnInit(): void {
    if(this.auth.obtenerTipoUsuario() == 'FUNCIONARIO' || this.auth.obtenerTipoUsuario() == 'ADMIN'){
      this.funcionario == true;
      this.rut_deudor = this.activatedRoute.snapshot.paramMap.get('rut') || "";
      this.obtenerDatosDeudor();
    }
    else{
      this.funcionario = false;
      this.obtener_devoluciones_deudor();
      this.dataSource = new MatTableDataSource();
    }
  }

  obtener_devoluciones_deudor(){
    let rut_deudor;

    if(this.funcionario){
      rut_deudor = this.rut_deudor;
    }
    else{
      rut_deudor = this.auth.obtenerUsuarioActual()!;
    }

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
    if(this.funcionario == true){
      this.router.navigate(['/funcionario/devoluciones/revisar/'+id_devolucion]);
    }
    else{
      this.router.navigate(['/deudor/devoluciones/'+id_devolucion]);
    }
  }

  private obtenerDatosDeudor(){
    this.declaracionService.obtenerDatosDeudor(this.rut_deudor).subscribe({
      next: result =>{
        this.nombres = result.nombres;
        this.ap_paterno = result.ap_paterno;
        this.ap_materno = result.ap_materno;
        this.funcionario = true;

        this.obtener_devoluciones_deudor();
        this.dataSource = new MatTableDataSource();
      }
    });
  }
}
