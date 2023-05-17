import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Postergacion } from 'src/app/modelos/postergacion';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

@Component({
  selector: 'app-datos-postergacion',
  templateUrl: './datos-postergacion.component.html',
  styleUrls: ['./datos-postergacion.component.css']
})
export class DatosPostergacionComponent implements OnInit {

  documentacion: File;
  postergacion: Postergacion;
  id_postergacion: string;
  funcionario: boolean;
  formulario: FormGroup;

  constructor(private auth: InicioSesionService, private solicitudService: SolicitudService, 
    private activatedRoute: ActivatedRoute, private router: Router) { 

      this.postergacion = new Postergacion();
      this.funcionario = false;
      this.formulario = new FormGroup({
        'comentarios': new FormControl("")
      });
  } 

  ngOnInit(): void {
    this.id_postergacion = this.activatedRoute.snapshot.paramMap.get('id') || "";
    this.verificarFuncionario();
    this.obtenerDatosDevolucion();
  }

  obtenerDatosDevolucion(){
    this.solicitudService.obtenerDatosPostergacion(this.id_postergacion).subscribe({
      next: result =>{
        this.postergacion = result;
      }
    });
  }

  visualizarPDF(){
    window.open(this.postergacion.archivo, '_blank');
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
  
      this.solicitudService.actualizarEstadoTramite(this.postergacion.rut_deudor, this.id_postergacion, nuevo_estado).subscribe({
        next: result =>{
          console.log(result);
        }
      });
      
      this.solicitudService.registrarRevision(this.auth.obtenerUsuarioActual()!, this.id_postergacion, 
        fecha, datos.comentarios, estado).subscribe({
        next: result =>{
          this.solicitudService.mostrarNotificacion("La revisión se ha registrado correctamente.", "Cerrar");
          this.router.navigate(['/home-funcionario/postergaciones/revisar']);
        }
      });
    }

}
