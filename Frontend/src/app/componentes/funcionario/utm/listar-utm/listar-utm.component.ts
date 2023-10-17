import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UTM } from 'src/app/modelos/utm';
import { DeclaracionService } from 'src/app/servicios/declaracion.service';
import { RegistrarUtmComponent } from '../registrar-utm/registrar-utm.component';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-listar-utm',
  templateUrl: './listar-utm.component.html',
  styleUrls: ['./listar-utm.component.css']
})
export class ListarUtmComponent implements OnInit {
  displayedColumns: string[] = ['year', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto',
  'septiembre', 'octubre', 'noviembre', 'diciembre', 'acciones'];

  dataSource: MatTableDataSource<UTM>;
  busqueda : FormGroup;
  
  constructor(private router: Router, private declaracionService: DeclaracionService, 
    public dialog: MatDialog) {

      this.busqueda = new FormGroup({
        'filtro': new FormControl("")
      });
    }

  ngOnInit(): void {
    this.obtenerUtm();
    this.dataSource = new MatTableDataSource();
  }

  obtenerUtm(){
    this.declaracionService.obtenerUtm().subscribe({
      next: (result) => {this.dataSource.data = result;},
      error: (err) => {console.log(err)}
    });
  }

  menuRegistrarUTM(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        registrar: true
    };

    const dialogRef = this.dialog.open(RegistrarUtmComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.obtenerUtm();
    });
  }

  menuEditarUTM(utm: UTM){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        registrar: false,
        utm
    };

    const dialogRef = this.dialog.open(RegistrarUtmComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      this.obtenerUtm();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }
}
