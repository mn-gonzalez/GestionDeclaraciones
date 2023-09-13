import { Component, OnInit } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Router } from '@angular/router';
import { Declaracion } from 'src/app/modelos/declaracion';
import { DeclaracionService } from 'src/app/servicios/declaracion.service';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';

@Component({
  selector: 'app-declaraciones-en-correccion',
  templateUrl: './declaraciones-en-correccion.component.html',
  styleUrls: ['./declaraciones-en-correccion.component.css']
})
export class DeclaracionesEnCorreccionComponent implements OnInit {
  displayedColumns: string[] = ['rut', 'nombres', 'ap_paterno', 'ap_materno','anio', 
  'total_ingresos', 'total_ingresos_utm', 'cuota_preliminar'];
  dataSource: MatTableDataSource<Declaracion>;

  constructor(private declaracionService: DeclaracionService, private auth: InicioSesionService,
    private router: Router) { }

  ngOnInit(): void {
    this.obtenerDeclaracionesEnCorreccion();
    this.dataSource = new MatTableDataSource();
  }

  obtenerDeclaracionesEnCorreccion(){
    let enCorreccion = 4;

    this.declaracionService.obtenerDeclaracionesSegunEstado(enCorreccion).subscribe({
      next: (result) => {
        console.log(result);
        this.dataSource.data = result;
      },
      error: (err) => {console.log(err)}
    });

  }

}
