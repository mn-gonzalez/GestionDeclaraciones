import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioFuncionarioRoutingModule } from './inicio-funcionario-routing.module';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { DatosDeclaracionComponent } from './declaraciones/datos-declaracion/datos-declaracion.component';
import { DeclaracionesDeudorComponent } from './declaraciones/declaraciones-deudor/declaraciones-deudor.component';
import { MaterialModule } from 'src/app/material.module';
import { RevisarDeclaracionComponent } from './declaraciones/revisar-declaracion/revisar-declaracion.component';
import { DeclaracionesPorRevisarComponent } from './declaraciones/declaraciones-por-revisar/declaraciones-por-revisar.component';
import { RegistrarDeudorComponent } from './usuarios/registrar-deudor/registrar-deudor.component';
import { RegistrarFuncionarioComponent } from './usuarios/registrar-funcionario/registrar-funcionario.component';
import { ListarFuncionariosComponent } from './usuarios/listar-funcionarios/listar-funcionarios.component';
import { RegistrarUtmComponent } from './utm/registrar-utm/registrar-utm.component';
import { ListarUtmComponent } from './utm/listar-utm/listar-utm.component';
import { PostergacionesSinRevisarComponent } from './solicitudes/postergaciones-sin-revisar/postergaciones-sin-revisar.component';
import { DevolucionesSinRevisarComponent } from './solicitudes/devoluciones-sin-revisar/devoluciones-sin-revisar.component';
import { DeclaracionesEnCorreccionComponent } from './declaraciones/declaraciones-en-correccion/declaraciones-en-correccion.component';
import { DeclaracionesEnRevisionComponent } from './declaraciones/declaraciones-en-revision/declaraciones-en-revision.component';
import { PostergacionesRevisadasComponent } from './solicitudes/postergaciones-revisadas/postergaciones-revisadas.component';
import { DevolucionesRevisadasComponent } from './solicitudes/devoluciones-revisadas/devoluciones-revisadas.component';
import { SharedModule } from 'src/app/shared.module';
import { ReportesComponent } from './reportes/reportes.component';
import { NgChartsModule } from 'ng2-charts';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
    declarations: [
        ListarUsuariosComponent,
        DatosDeclaracionComponent,
        DeclaracionesDeudorComponent,
        RevisarDeclaracionComponent,
        DeclaracionesPorRevisarComponent,
        RegistrarDeudorComponent,
        RegistrarFuncionarioComponent,
        ListarFuncionariosComponent,
        RegistrarUtmComponent,
        ListarUtmComponent,
        PostergacionesSinRevisarComponent,
        DevolucionesSinRevisarComponent,
        DeclaracionesEnCorreccionComponent,
        DeclaracionesEnRevisionComponent,
        PostergacionesRevisadasComponent,
        DevolucionesRevisadasComponent,
        ReportesComponent
    ],
    imports: [
        CommonModule,
        InicioFuncionarioRoutingModule,
        MaterialModule,
        SharedModule,
        NgChartsModule,
        NgxMaskDirective,
        NgxMaskPipe
    ]
})
export class InicioFuncionarioModule { }