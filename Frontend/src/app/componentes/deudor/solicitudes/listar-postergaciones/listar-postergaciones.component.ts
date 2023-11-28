import { Component, OnInit } from '@angular/core';
import { Postergacion } from 'src/app/modelos/postergacion';
import { SolicitudService } from "src/app/servicios/solicitud.service";
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DeclaracionService } from 'src/app/servicios/declaracion.service';

@Component({
  selector: 'app-listar-postergaciones',
  templateUrl: './listar-postergaciones.component.html',
  styleUrls: ['./listar-postergaciones.component.css']
})
export class ListarPostergacionesComponent implements OnInit {

  displayedColumns: string[] = ['fecha', 'estado', 'acciones'];
  dataSource: MatTableDataSource<Postergacion>;
  funcionario: boolean;
  rut_deudor: string;
  nombres: string;
  ap_paterno: string;
  ap_materno: string;

  constructor(private solicitudService: SolicitudService, 
    private auth: InicioSesionService, 
    private declaracionService: DeclaracionService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if(this.auth.obtenerTipoUsuario() == 'FUNCIONARIO' || this.auth.obtenerTipoUsuario() == 'ADMIN'){
      this.funcionario == true;
      this.rut_deudor = this.activatedRoute.snapshot.paramMap.get('rut') || "";
      this.obtenerDatosDeudor();
    }
    else{
      this.funcionario = false;
      this.obtenerPostergacionesDeudor();
      this.dataSource = new MatTableDataSource();
    }
  }

  obtenerPostergacionesDeudor(){
    let rut_deudor;

    if(this.funcionario){
      rut_deudor = this.rut_deudor;
    }
    else{
      rut_deudor = this.auth.obtenerUsuarioActual()!;
    }

    this.solicitudService.obtenerPostergaciones(rut_deudor).subscribe({
      next: (result) => {
        this.dataSource.data = result;
        console.log(result);
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
    if(this.funcionario){
      this.router.navigate(['/funcionario/postergaciones/revisar/'+id_postergacion]);
    }
    else{
      this.router.navigate(['/deudor/postergaciones/'+id_postergacion]);
    }
  }

  private obtenerDatosDeudor(){
    this.declaracionService.obtenerDatosDeudor(this.rut_deudor).subscribe({
      next: result =>{
        this.nombres = result.nombres;
        this.ap_paterno = result.ap_paterno;
        this.ap_materno = result.ap_materno;
        this.funcionario = true;

        this.obtenerPostergacionesDeudor();
        this.dataSource = new MatTableDataSource();
      }
    });
  }

}
