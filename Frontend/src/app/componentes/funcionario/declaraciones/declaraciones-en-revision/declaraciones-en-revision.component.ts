import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Declaracion } from 'src/app/modelos/declaracion';
import { DeclaracionService } from 'src/app/servicios/declaracion.service';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';

@Component({
  selector: 'app-declaraciones-en-revision',
  templateUrl: './declaraciones-en-revision.component.html',
  styleUrls: ['./declaraciones-en-revision.component.css']
})
export class DeclaracionesEnRevisionComponent implements OnInit {
  displayedColumns: string[] = ['rut', 'nombres', 'ap_paterno', 'ap_materno','anio', 
    'total_ingresos', 'total_ingresos_utm', 'cuota_preliminar', 'acciones'];
  dataSource: MatTableDataSource<Declaracion>;
  
  rut_funcionario: string;

  constructor(private declaracionService: DeclaracionService, private auth: InicioSesionService,
    private router: Router) {
      
    }

  ngOnInit(): void {
    this.auth.obtenerUsuarioActual();
    this.obtenerDeclaracionesEnRevision();
    this.dataSource = new MatTableDataSource();
  }

  obtenerDeclaracionesEnRevision(){
    this.declaracionService.obtenerDeclaracionesEnRevision(this.rut_funcionario).subscribe({
      next: (result) => {
        this.dataSource.data = result;
      },
      error: (err) => {console.log(err)}
    });

  }

  revisarDeclaracion(id_declaracion: string){
    //realizar operaciones para que la revision de la declaracion quede asignada al funcionario
    this.router.navigate(['/funcionario/declaraciones/revisar/'+id_declaracion]);
  }

}
