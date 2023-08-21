import { Component, OnInit } from '@angular/core';
import { Devolucion } from 'src/app/modelos/devolucion';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Revision } from 'src/app/modelos/revision';

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
  datosDevolucion: FormGroup;
  formulario: FormGroup;
  revision: Revision;
  comentarios: string = "";

  constructor(private auth: InicioSesionService, private solicitudService: SolicitudService, 
    private activatedRoute: ActivatedRoute, private router: Router) { 

    this.devolucion = new Devolucion();
    this.funcionario = false;

    this.datosDevolucion = new FormGroup({
      'id': new FormControl(""),
      'rut_deudor': new FormControl(""),
      'nombres': new FormControl(""),
      'ap_paterno': new FormControl(""),
      'ap_materno': new FormControl(""),
      'fecha': new FormControl(""),
      'domicilio': new FormControl(""),
      'telefono': new FormControl(""),
      'correo': new FormControl(""),
      'tipo_deuda': new FormControl(""),
      'retiro_oficina': new FormControl(""),
      'solicitud': new FormControl("")
    });

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
        this.datosDevolucion.get('rut_deudor')!.setValue(result.rut_deudor);
        this.datosDevolucion.get('nombres')!.setValue(result.nombres);
        this.datosDevolucion.get('ap_paterno')!.setValue(result.ap_paterno);
        this.datosDevolucion.get('ap_materno')!.setValue(result.ap_materno);
        this.datosDevolucion.get('domicilio')!.setValue(result.domicilio);
        this.datosDevolucion.get('correo')!.setValue(result.correo);
        this.datosDevolucion.get('telefono')!.setValue(result.telefono);
        this.datosDevolucion.get('tipo_deuda')!.setValue(result.tipo_deuda);
        this.datosDevolucion.get('solicitud')!.setValue(result.solicitud);
        this.datosDevolucion.get('retiro_oficina')!.setValue(result.retiro_oficina);

        if(this.devolucion.estado == 3 || this.devolucion.estado == 4){
          this.obtenerComentariosDevolucion(this.devolucion.id);
        }
      }
    });
  }

  obtenerComentariosDevolucion(id_devolucion: string){
    this.solicitudService.obtenerComentariosSolicitud(id_devolucion).subscribe({
      next: result =>{
        this.revision = result;
        this.formulario.get('comentarios')!.setValue(result.comentarios);
        //this.comentarios = this.revision.comentarios;
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
