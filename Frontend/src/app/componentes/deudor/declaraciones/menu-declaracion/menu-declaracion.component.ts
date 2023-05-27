import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeclaracionService } from 'src/app/servicios/declaracion.service';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';

@Component({
  selector: 'app-menu-declaracion',
  templateUrl: './menu-declaracion.component.html',
  styleUrls: ['./menu-declaracion.component.css']
})
export class MenuDeclaracionComponent implements OnInit {
  declaracion_firmada: File;

  constructor(private router: Router, private declaracionService: DeclaracionService, private auth: InicioSesionService) {

  }

  ngOnInit(): void {

  }

  verificarEntregaFormulario(){

  }

  verificarDescargaDeclaracion(){
    
  }

  verificarEntregaDeclaracionNotario(){

  }

  menuRegistrarDeclaracion(){
    this.router.navigate(['/home-deudor/declaracion']);
  }

  descargarDeclaracion(){
    let rut_deudor = this.auth.obtenerUsuarioActual();
    let aux_fecha = new Date();
    let year = aux_fecha.getFullYear();

    let id_declaracion = "DEC"+rut_deudor+"_"+year;
    this.declaracionService.obtenerUrlArchivo(id_declaracion, "PDF_DECLARACION").subscribe({
      next: result =>{
        window.open(result.toString(), '_blank');
      }
    });
  }

  upload(event: any){
    
  }

  visualizarPDF(){

  }

  subirDeclaracionFirmada(){

  }

  menuSubirDeclaracion(){

  }

}
