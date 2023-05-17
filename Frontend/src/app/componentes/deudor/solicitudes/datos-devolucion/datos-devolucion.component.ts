import { Component, OnInit } from '@angular/core';
import { Devolucion } from 'src/app/modelos/devolucion';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-datos-devolucion',
  templateUrl: './datos-devolucion.component.html',
  styleUrls: ['./datos-devolucion.component.css']
})
export class DatosDevolucionComponent implements OnInit {
  fotocopia_cedula: File;
  devolucion: Devolucion;
  id_devolucion: string;
  funcionario: boolean;
  formulario: FormGroup;

  constructor(private auth: InicioSesionService, private solicitudService: SolicitudService, 
    private activatedRoute: ActivatedRoute, private router: Router) { 

    this.devolucion = new Devolucion();
    this.funcionario = false;
    this.formulario = new FormGroup({
      'comentarios': new FormControl("")
    });
  }

  ngOnInit(): void {
    this.id_devolucion = this.activatedRoute.snapshot.paramMap.get('id') || "";
    this.verificarFuncionario();
    this.obtenerDatosDevolucion();
  }

  obtenerDatosDevolucion(){
    this.solicitudService.obtenerDatosDevolucion(this.id_devolucion).subscribe({
      next: result =>{
        this.devolucion = result;
      }
    });
  }

  visualizarPDF(){
    window.open(this.devolucion.archivo, '_blank');
  }

  verificarFuncionario(){
    if(this.auth.obtenerTipoUsuario() == "DEUDOR"){
      this.funcionario = false;
    }
    else{
      this.funcionario = true;
    }
  }

  /*
    Estados de una solicitud (postergacion y devolucion)
    1 - POR REVISAR
    2 - EN REVISION
    3 - ACEPTADA
    4 - RECHAZADA
  */
  registrarRevision(estado: string){
    let fecha = this.solicitudService.obtenerFechaActual();
    let datos = this.formulario.value;
    let nuevo_estado = 0;

    if(estado == "RECHAZADA"){
      nuevo_estado = 4;
    }
    else if(estado == "ACEPTADA"){
      nuevo_estado = 3;
    }

    this.solicitudService.actualizarEstadoTramite(this.devolucion.rut_deudor, this.id_devolucion, nuevo_estado).subscribe({
      next: result =>{
        console.log(result);
      }
    });

    this.solicitudService.registrarRevision(this.auth.obtenerUsuarioActual()!, this.id_devolucion, 
      fecha, datos.comentarios, estado).subscribe({
      next: result =>{
        this.solicitudService.mostrarNotificacion("La revision se ha registrado correctamente.", "Cerrar");
        this.router.navigate(['/home-funcionario/devoluciones/revisar']);
      }
    });
  }

}
