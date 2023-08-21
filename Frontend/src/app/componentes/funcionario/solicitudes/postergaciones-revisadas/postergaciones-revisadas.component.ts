import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Postergacion } from 'src/app/modelos/postergacion';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

@Component({
  selector: 'app-postergaciones-revisadas',
  templateUrl: './postergaciones-revisadas.component.html',
  styleUrls: ['./postergaciones-revisadas.component.css']
})
export class PostergacionesRevisadasComponent implements OnInit {
  displayedColumns: string[] = ['rut', 'nombres', 'ap_paterno', 'ap_materno', 'fecha', 'estado', 'acciones'];
  dataSource: MatTableDataSource<Postergacion>;
  rut_funcionario: string;

  constructor(private solicitudService: SolicitudService, private router: Router, private auth: InicioSesionService) { 
    
  }

  ngOnInit(): void {
    this.rut_funcionario = this.auth.obtenerUsuarioActual()!;
    this.obtenerPostergacionesRevisadas();
    this.dataSource = new MatTableDataSource();
  }

  obtenerPostergacionesRevisadas(){
    this.solicitudService.obtenerPostergacionesRevisadas(this.rut_funcionario).subscribe({
      next: (result) => {
        result.forEach(postergacion=>{
          postergacion.estado_text = this.solicitudService.convertirEstadoATexto(postergacion.estado);
        });

        this.dataSource.data = result;
      },
      error: (err) => {console.log(err)}
    });
  }

  detallesPostergacion(id_postergacion: string){
    this.router.navigate(['/home-funcionario/funcionario/postergaciones/revisadas/'+id_postergacion]);
  }

}
