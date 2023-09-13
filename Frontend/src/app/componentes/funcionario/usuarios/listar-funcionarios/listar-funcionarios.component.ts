import { Component, OnInit } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { UntypedFormGroup, UntypedFormControl, Validators, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Funcionario } from 'src/app/modelos/funcionario';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { RegistrarFuncionarioComponent } from '../registrar-funcionario/registrar-funcionario.component';

@Component({
  selector: 'app-listar-funcionarios',
  templateUrl: './listar-funcionarios.component.html',
  styleUrls: ['./listar-funcionarios.component.css']
})
export class ListarFuncionariosComponent implements OnInit {
  displayedColumns: string[] = ['rut', 'nombres', 'ap_paterno', 'ap_materno'];
  dataSource: MatTableDataSource<Funcionario>;
  busqueda : UntypedFormGroup;

  constructor(private router: Router, private usuarioService: UsuarioService, 
    public dialog: MatDialog) {

      this.busqueda = new UntypedFormGroup({
        'filtro': new UntypedFormControl("")
      });
   }

  ngOnInit(): void {
    this.obtenerFuncionarios();
    this.dataSource = new MatTableDataSource();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toUpperCase();
  }

  obtenerFuncionarios(){
    this.usuarioService.obtenerFuncionarios().subscribe({
      next: (result) => {this.dataSource.data = result;},
      error: (err) => {console.log(err)}
    });
  }

  menuRegistrarFuncionario(){
    const dialogRef = this.dialog.open(RegistrarFuncionarioComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.obtenerFuncionarios();
    });
  }
}
