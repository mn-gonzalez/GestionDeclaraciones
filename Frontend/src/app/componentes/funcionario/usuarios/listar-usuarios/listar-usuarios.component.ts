import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Deudor } from 'src/app/modelos/deudor';
import { RegistrarDeudorComponent } from '../registrar-deudor/registrar-deudor.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  displayedColumns: string[] = ['rut', 'nombres', 'ap_paterno', 'ap_materno', 'acciones'];
  dataSource: MatTableDataSource<Deudor>;
  busqueda : FormGroup;

  constructor(private router: Router, private usuarioService: UsuarioService, 
    public dialog: MatDialog) {
    this.busqueda = new FormGroup({
      'filtro': new FormControl("")
    });
   }

  ngOnInit(): void {
    this.obtenerDeudores();
    this.dataSource = new MatTableDataSource();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }

  submit(){

  }

  obtenerDeudores(){
    this.usuarioService.obtenerDeudores().subscribe({
      next: (result) => {this.dataSource.data = result;},
      error: (err) => {console.log(err)}
    });
  }

  verDeclaracionesDeudor(rut: string){
    this.router.navigate(['/funcionario/declaraciones/'+rut]);
  }

  verPostergacionesDeudor(rut: string){
    this.router.navigate(['/funcionario/postergaciones/'+rut]);
  }

  verDevolucionesDeudor(rut: string){
    this.router.navigate(['/funcionario/devoluciones/'+rut]);
  }

  menuRegistrarDeudor(){
    const dialogRef = this.dialog.open(RegistrarDeudorComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.obtenerDeudores();
    });
  }

}
