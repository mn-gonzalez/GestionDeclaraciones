import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Postergacion } from 'src/app/modelos/postergacion';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

@Component({
  selector: 'app-postergaciones-sin-revisar',
  templateUrl: './postergaciones-sin-revisar.component.html',
  styleUrls: ['./postergaciones-sin-revisar.component.css']
})
export class PostergacionesSinRevisarComponent implements OnInit {

  displayedColumns: string[] = ['rut', 'nombres', 'ap_paterno', 'ap_materno', 'fecha', 'acciones'];
  dataSource: MatTableDataSource<Postergacion>;

  constructor(private solicitudService: SolicitudService, private router: Router, private auth: InicioSesionService) {
    
   }

  ngOnInit(): void {
    this.obtenerPostergacionesSinRevisar();
    this.dataSource = new MatTableDataSource();
  }

  obtenerPostergacionesSinRevisar(){
    this.solicitudService.obtenerPostergacionesSinRevisar().subscribe({
      next: (result) => {
        console.log(result);
        this.dataSource.data = result;
      },
      error: (err) => {console.log(err)}
    });
  }

  revisarPostergacion(id_postergacion: string){
    //realizar operaciones para que la revision de la declaracion quede asignada al funcionario
    this.router.navigate(['/home-funcionario/postergaciones/revisar/'+id_postergacion]);
  }

}
