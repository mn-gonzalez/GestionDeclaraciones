import { Component, OnInit } from '@angular/core';
import { Devolucion } from 'src/app/modelos/devolucion';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';

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
  comentarios: FormControl;

  constructor(private auth: InicioSesionService, private solicitudService: SolicitudService, private activatedRoute: ActivatedRoute) { 
    this.devolucion = new Devolucion();
    this.funcionario = false;
    this.comentarios = new FormControl("");
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

  registrarRevision(){

  }

}
