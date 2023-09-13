import { Component, OnInit } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Router } from '@angular/router';
import { Devolucion } from 'src/app/modelos/devolucion';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { SolicitudService } from 'src/app/servicios/solicitud.service';

@Component({
  selector: 'app-devoluciones-sin-revisar',
  templateUrl: './devoluciones-sin-revisar.component.html',
  styleUrls: ['./devoluciones-sin-revisar.component.css']
})
export class DevolucionesSinRevisarComponent implements OnInit {

  displayedColumns: string[] = ['rut', 'nombres', 'ap_paterno', 'ap_materno', 'fecha', 'acciones'];
  dataSource: MatTableDataSource<Devolucion>;

  constructor(private solicitudService: SolicitudService, private router: Router, private auth: InicioSesionService) {

  }

  ngOnInit(): void {
    this.obtenerDevolucionesSinRevisar();
    this.dataSource = new MatTableDataSource();
  }

  obtenerDevolucionesSinRevisar(){
    this.solicitudService.obtenerDevolucionesSinRevisar().subscribe({
      next: (result) => {
        console.log(result);
        this.dataSource.data = result;
      },
      error: (err) => {console.log(err)}
    });
  }

  revisarDevolucion(id_devolucion: string){
    //realizar operaciones para que la revision de la declaracion quede asignada al funcionario
    this.router.navigate(['/home-funcionario/devoluciones/revisar/'+id_devolucion]);
  }

}
