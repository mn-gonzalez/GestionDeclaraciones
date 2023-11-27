import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InicioSesionComponent } from '../../inicio-sesion/inicio-sesion.component';
import { ActivatedRoute, Router } from '@angular/router';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent implements OnInit {
  formulario: FormGroup;
  expiro: boolean;
  token: string;
  error: boolean;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private auth: InicioSesionService,
    private router: Router){

    this.formulario = new FormGroup({
      'correo': new FormControl("", [Validators.required, Validators.email]),
      'contrasena': new FormControl("", Validators.required),
      'verificacion': new FormControl("", Validators.required)
    });
  }

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.paramMap.get('token') || "";

    //verificar token
  }

  verificarContrasena(value: string) {
    let contrasena = this.formulario.get('contrasena')!.value;
    console.log(value, contrasena);

    if(contrasena === value){
      this.error = false;
    }
    else {
      this.error = true;
    }
  }

  actualizarContrasena(){
    let correo = this.formulario.get('correo')!.value;
    let contrasena = this.formulario.get('contrasena')!.value;

    this.auth.actualizarContrasena(correo, contrasena, this.token).subscribe({
      next: result =>{
        this.auth.mostrarNotificacion(result, "Cerrar");
        this.router.navigate(['/login']);
      }, 
      error: result =>{
        console.log(result);
      }
    });
  }
}
