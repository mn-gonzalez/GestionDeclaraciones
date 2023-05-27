import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,FormControl, Validators} from '@angular/forms';
import { DeclaracionService } from "src/app/servicios/declaracion.service";
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UTM } from 'src/app/modelos/utm';

interface Region{
  nombre: string;
  comunas: string[];
}

interface Ingreso{
  id: string;
  nombre: string;
  formControl: string;
  valor: string;
  formControlUTM: string;
}

interface Afp{
  id: number;
  nombre: string;
}

@Component({
  selector: 'app-registrar-declaracion',
  templateUrl: './registrar-declaracion.component.html',
  styleUrls: ['./registrar-declaracion.component.css']
})
export class RegistrarDeclaracionComponent implements OnInit {

  //Atributo que contiene el año actual.
  year: number

  //Atributo que contiene el rut del deudor que esta realizando la declaracion
  rut_deudor: string;

  //Atributo que contiene el id de la declaracion que se va a registrar o se esta registrando.
  id_declaracion: string;

  //Atributo que verifica si la interfaz puede continuar al siguiente paso con campos sin completar.
  isLinear = false;

  //Atributo que verifica si la declaracion ya existe en la base de datos
  existe_declaracion = false;

  //Atributo que indica si el deudor debe realizar correcciones a su declaracion.
  corregir_declaracion = false;

  //datos para los formularios donde se almacenan los datos ingresados por el deudor
  datosPersonales: FormGroup;
  ingresosDeudor: FormGroup;
  conyuge: FormGroup;
  comentarios: FormControl;

  //listado de afps disponibles
  afps: Afp[] = [
    {id: 1, nombre: "CAPITAL"},
    {id: 2, nombre: "CUPRUM"},
    {id: 3, nombre: "HABITAT"},
    {id: 4, nombre: "MODELO"},
    {id: 5, nombre: "PLANVITAL"},
    {id: 6, nombre: "PROVIDA"},
    {id: 7, nombre: "UNO"}
  ];

  regiones: Region[] = [
    { nombre: "ARICA Y PARINACOTA", comunas: ["ARICA", "CAMARONES", "PUTRE", "GENERAL LAGOS"] },
    { nombre: "TARAPACÁ", comunas: ["IQUIQUE", "ALTO HOSPICIO", "POZO ALMONTE", "CAMIÑA", "COLCHANE", "HUARA", "PICA"]},
    { nombre: "ANTOFAGASTA", comunas: ["ANTOFAGASTA", "MEJILLONES", "SIERRA GORDA", "TALTAL", "CALAMA", "OLLAGÜE", "SAN PEDRO DE ATACAMA", "TOCOPILLA", "MARÍA ELENA"]},
    { nombre: "ATACAMA", comunas: ["COPIAPÓ", "CALDERA", "TIERRA AMARILLA", "CHAÑARAL", "DIEGO DE ALMAGRO", "VALLENAR", "ALTO DEL CARMEN", "FREIRINA", "HUASCO"]},
    { nombre: "COQUIMBO", comunas: ["LA SERENA", "COQUIMBO", "ANDACOLLO", "LA HIGUERA", "PAIGUANO", "VICUÑA", "ILLAPEL", "CANELA", "LOS VILOS", "SALAMANCA", "OVALLE", "COMBARBALÁ", "MONTE PATRIA", "PUNITAQUI", "RÍO HURTADO"]},
    { nombre: "VALPARAÍSO", comunas: ["VALPARAÍSO", "CASABLANCA", "CONCÓN", "JUAN FERNÁNDEZ", "PUCHUNCAVÍ", "QUINTERO", "VIÑA DEL MAR", "ISLA DE PASCUA", "LOS ANDES", "CALLE LARGA", "RINCONADA", "SAN ESTEBAN", "LA LIGUA", "CABILDO", "PAPUDO", "PETORCA", "ZAPALLAR", "QUILLOTA", "CALERA", "HIJUELAS", "LA CRUZ", "NOGALES", "SAN ANTONIO", "ALGARROBO", "CARTAGENA", "EL QUISCO", "EL TABO", "SANTO DOMINGO", "SAN FELIPE", "CATEMU", "LLAILLAY", "PANQUEHUE", "PUTAENDO", "SANTA MARÍA", "QUILPUÉ", "LIMACHE", "OLMUÉ", "VILLA ALEMANA"]},
    { nombre: "REGIÓN DEL LIBERTADOR GRAL. BERNARDO O’HIGGINS", comunas: ["RANCAGUA", "CODEGUA", "COINCO", "COLTAUCO", "DOÑIHUE", "GRANEROS", "LAS CABRAS", "MACHALÍ", "MALLOA", "MOSTAZAL", "OLIVAR", "PEUMO", "PICHIDEGUA", "QUINTA DE TILCOCO", "RENGO", "REQUÍNOA", "SAN VICENTE", "PICHILEMU", "LA ESTRELLA", "LITUECHE", "MARCHIHUE", "NAVIDAD", "PAREDONES", "SAN FERNANDO", "CHÉPICA", "CHIMBARONGO", "LOLOL", "NANCAGUA", "PALMILLA", "PERALILLO", "PLACILLA", "PUMANQUE", "SANTA CRUZ"]},
    { nombre: "REGIÓN DEL MAULE", comunas: ["TALCA", "CONSTITUCIÓN", "CUREPTO", "EMPEDRADO", "MAULE", "PELARCO", "PENCAHUE", "RÍO CLARO", "SAN CLEMENTE", "SAN RAFAEL", "CAUQUENES", "CHANCO", "PELLUHUE", "CURICÓ", "HUALAÑÉ", "LICANTÉN", "MOLINA", "RAUCO", "ROMERAL", "SAGRADA FAMILIA", "TENO", "VICHUQUÉN", "LINARES", "COLBÚN", "LONGAVÍ", "PARRAL", "REVRO", "SAN JAVIER", "VILLA ALEGRE", "YERBAS BUENAS"]},
    { nombre: "REGIÓN DEL BIOBÍO", comunas: ["CONCEPCIÓN", "CORONEL", "CHIGUAYANTE", "FLORIDA", "HUALQUI", "LOTA", "PENCO", "SAN PEDRO DE LA PAZ", "SANTA JUANA", "TALCAHUANO", "TOMÉ", "HUALPÉN", "LEBU", "ARAUCO", "CAÑETE", "CONTULMO", "CURANILAHUE", "LOS ÁLAMOS", "TIRÚA", "LOS ÁNGELES", "ANTUCO", "CABRERO", "LAJA", "MULCHÉN", "NACIMIENTO", "NEGRETE", "QUILACO", "QUILLECO", "SAN ROSENDO", "SANTA BÁRBARA", "TUCAPEL", "YUMBEL", "ALTO BIOBÍO", "CHILLÁN", "BULNES", "COBQUECURA", "COELEMU", "COIHUECO", "CHILLÁN VIEJO", "EL CARMEN", "NINHUE", "ÑIQUÉN", "PEMUCO", "PINTO", "PORTEZUELO", "QUILLÓN", "QUIRIHUE", "RÁNQUIL", "SAN CARLOS", "SAN FABIÁN", "SAN IGNACIO", "SAN NICOLÁS", "TREGUACO", "YUNGAY"]},
    { nombre: "REGIÓN DE LA ARAUCANÍA", comunas: ["TEMUCO", "CARAHUE", "CUNCO", "CURARREHUE", "FREIRE", "GALVARINO", "GORBEA", "LAUTARO", "LONCOCHE", "MELIPEUCO", "NUEVA IMPERIAL", "PADRE LAS CASAS", "PERQUENCO", "PITRUFQUÉN", "PUCÓN", "SAAVEDRA", "TEODORO SCHMIDT", "TOLTÉN", "VILCÚN", "VILLARRICA", "CHOLCHOL", "ANGOL", "COLLIPULLI", "CURACAUTÍN", "ERCILLA", "LONQUIMAY", "LOS SAUCES", "LUMACO", "PURÉN", "RENAICO", "TRAIGUÉN", "VICTORIA"]},
    { nombre: "REGIÓN DE LOS RÍOS", comunas: ["VALDIVIA", "CORRAL", "LANCO", "LOS LAGOS", "MÁFIL", "MARIQUINA", "PAILLACO", "PANGUIPULLI", "LA UNIÓN", "FUTRONO", "LAGO RANCO", "RÍO BUENO"]},
    { nombre: "REGIÓN DE LOS LAGOS", comunas: ["PUERTO MONTT", "CALBUCO", "COCHAMÓ", "FRESIA", "FRUVLLAR", "LOS MUERMOS", "LLANQUIHUE", "MAULLÍN", "PUERTO VARAS", "CASTRO", "ANCUD", "CHONCHI", "CURACO DE VÉLEZ", "DALCAHUE", "PUQUELDÓN", "QUEILÉN", "QUELLÓN", "QUEMCHI", "QUINCHAO", "OSORNO", "PUERTO OCTAY", "PURRANQUE", "PUYEHUE", "RÍO NEGRO", "SAN JUAN DE LA COSTA", "SAN PABLO", "CHAITÉN", "FUTALEUFÚ", "HUALAIHUÉ", "PALENA"]},
    { nombre: "REGIÓN AISÉN DEL GRAL. CARLOS IBÁÑEZ DEL CAMPO", comunas: ["COIHAIQUE", "LAGO VERDE", "AISÉN", "CISNES", "GUAITECAS", "COCHRANE", "O’HIGGINS", "TORTEL", "CHILE CHICO", "RÍO IBÁÑEZ"]},
    { nombre: "REGIÓN DE MAGALLANES Y DE LA ANTÁRTICA CHILENA", comunas: ["PUNTA ARENAS", "LAGUNA BLANCA", "RÍO VERDE", "SAN GREGORIO", "CABO DE HORNOS (EX NAVARINO)", "ANTÁRVCA", "PORVENIR", "PRIMAVERA", "TIMAUKEL", "NATALES", "TORRES DEL PAINE"]},
    { nombre: "REGIÓN METROPOLITANA DE SANTIAGO", comunas: ["CERRILLOS", "CERRO NAVIA", "CONCHALÍ", "EL BOSQUE", "ESTACIÓN CENTRAL", "HUECHURABA", "INDEPENDENCIA", "LA CISTERNA", "LA FLORIDA", "LA GRANJA", "LA PINTANA", "LA REINA", "LAS CONDES", "LO BARNECHEA", "LO ESPEJO", "LO PRADO", "MACUL", "MAIPÚ", "ÑUÑOA", "PEDRO AGUIRRE CERDA", "PEÑALOLÉN", "PROVIDENCIA", "PUDAHUEL", "QUILICURA", "QUINTA NORMAL", "RECOLETA", "RENCA", "SAN JOAQUÍN", "SAN MIGUEL", "SAN RAMÓN", "VITACURA", "PUENTE ALTO", "PIRQUE", "SAN JOSÉ DE MAIPO", "COLINA", "LAMPA", "TILVL", "SAN BERNARDO", "BUIN", "CALERA DE TANGO", "PAINE", "MELIPILLA", "ALHUÉ", "CURACAVÍ", "MARÍA PINTO", "SAN PEDRO", "TALAGANTE", "EL MONTE", "ISLA DE MAIPO", "PADRE HURTADO", "PEÑAFLOR"]}
  ];

  comunas: string[];

  utm: UTM;

  ingresos: Ingreso[] = [
    {id: "1", nombre: "Enero", formControl:"enero", valor:"49.673",formControlUTM:"enero_utm" },
    {id: "2", nombre: "Febrero", formControl:"febrero",valor:"49.723", formControlUTM:"febrero_utm"},
    {id: "3", nombre: "Marzo", formControl:"marzo", valor:"50.021", formControlUTM:"marzo_utm"},
    {id: "4", nombre: "Abril", formControl:"abril", valor:"50.221", formControlUTM:"abril_utm"},
    {id: "5", nombre: "Mayo", formControl:"mayo", valor:"50.372",formControlUTM:"mayo_utm"},
    {id: "6", nombre: "Junio", formControl:"junio", valor:"50.372", formControlUTM:"junio_utm"},
    {id: "7", nombre: "Julio", formControl:"julio", valor:"50.322", formControlUTM:"julio_utm"},
    {id: "8", nombre: "Agosto", formControl:"agosto",valor:"50.272", formControlUTM:"agosto_utm"},
    {id: "9", nombre: "Septiembre", formControl:"septiembre", valor:"50.322", formControlUTM:"septiembre_utm"},
    {id: "10", nombre: "Octubre", formControl:"octubre", valor:"50.372", formControlUTM:"octubre_utm"},
    {id: "11", nombre: "Noviembre", formControl:"noviembre", valor:"50.674", formControlUTM:"noviembre_utm"},
    {id: "12", nombre: "Diciembre",  formControl:"diciembre", valor:"51.029",formControlUTM:"diciembre_utm"}
  ];

  //array que indica las columnas que se muestran en la tabla de ingresos e ingresos coyuge
  displayedColumns: string[] = ['mes', 'ingresos_pesos', 'utm', 'ingresos_utm'];

  //indica la fuente desde la cual se obtienen los datos que se muestran en la tabla de ingresos
  dataSource = this.ingresos;

  constructor(private declaracionService: DeclaracionService, 
    private auth: InicioSesionService, private router: Router, public dialog: MatDialog) { 

    /*
      Contiene los datos necesarios para almacenar los antecedents personales del deudor en la declaracion.
    */
    this.datosPersonales = new FormGroup({
      'id': new FormControl(""),
      'rut_deudor': new FormControl(""),
      'nombres': new FormControl(""),
      'ap_paterno': new FormControl(""),
      'ap_materno': new FormControl(""),
      'direccion': new FormControl(""),
      'region': new FormControl(""),
      'comuna': new FormControl(""),
      'ciudad': new FormControl(""),
      'telefono': new FormControl(""),
      'correo': new FormControl(""),
      'afp': new FormControl(""),
      'estado_civil': new FormControl(""),
      'trabajo': new FormControl(""),
      'tel_trabajo': new FormControl("")
    });

    this.ingresosDeudor = new FormGroup({
      'enero': new FormControl(0),
      'febrero': new FormControl(0),
      'marzo': new FormControl(0),
      'abril': new FormControl(0),
      'mayo': new FormControl(0),
      'junio': new FormControl(0),
      'julio': new FormControl(0),
      'agosto': new FormControl(0),
      'septiembre': new FormControl(0),
      'octubre': new FormControl(0),
      'noviembre': new FormControl(0),
      'diciembre': new FormControl(0),
      'enero_utm': new FormControl(0),
      'febrero_utm': new FormControl(0),
      'marzo_utm': new FormControl(0),
      'abril_utm': new FormControl(0),
      'mayo_utm': new FormControl(0),
      'junio_utm': new FormControl(0),
      'julio_utm': new FormControl(0),
      'agosto_utm': new FormControl(0),
      'septiembre_utm': new FormControl(0),
      'octubre_utm': new FormControl(0),
      'noviembre_utm': new FormControl(0),
      'diciembre_utm': new FormControl(0),
      'ingreso_total_deudor': new FormControl(0),
      'ingreso_total_deudor_utm': new FormControl(0),
      'ingreso_total_conyuge': new FormControl(0),
      'ingreso_total_conyuge_utm': new FormControl(0),
      'cuota_preliminar': new FormControl(0)
    });

    this.conyuge = new FormGroup({
      'rut_conyuge': new FormControl(""),
      'nombres': new FormControl(""),
      'ap_paterno': new FormControl(""),
      'ap_materno': new FormControl(""),
      'enero': new FormControl(0),
      'febrero': new FormControl(0),
      'marzo': new FormControl(0),
      'abril': new FormControl(0),
      'mayo': new FormControl(0),
      'junio': new FormControl(0),
      'julio': new FormControl(0),
      'agosto': new FormControl(0),
      'septiembre': new FormControl(0),
      'octubre': new FormControl(0),
      'noviembre': new FormControl(0),
      'diciembre': new FormControl(0),
      'enero_utm': new FormControl(0),
      'febrero_utm': new FormControl(0),
      'marzo_utm': new FormControl(0),
      'abril_utm': new FormControl(0),
      'mayo_utm': new FormControl(0),
      'junio_utm': new FormControl(0),
      'julio_utm': new FormControl(0),
      'agosto_utm': new FormControl(0),
      'septiembre_utm': new FormControl(0),
      'octubre_utm': new FormControl(0),
      'noviembre_utm': new FormControl(0),
      'diciembre_utm': new FormControl(0)
    });

    this.comentarios = new FormControl("");
  }


  //almacenan de manera temporal los archivos que el deudor va a subir como documentacion.
  documento_renta: File;
  documento_renta_conyuge: File;
  documento_licencias: File;
  documento_cotizaciones: File;
  documento_formulario22: File;
  documento_libreta_matrimonio: File;
  documento_declaracion_sin_ingresos: File;
  documento_declaracion_sin_ingresos_conyuge: File;
  documento_finiquito: File;
  documento_finiquito_conyuge: File;
  documento_cert_nacimiento: File;
  documento_carp_tributaria_deudor: File;
  documento_carp_tributaria_conyuge: File;
  documento_copia_pagare_conyuge: File;

  casado = false;
  tieneHijos = false;
  casadoReprog = false;
  deudorDebePresentarDecSimple = false;
  conyugeDebePresentarDecSimple = false;

  ngOnInit(): void {
    this.year = new Date().getFullYear();
    if(this.auth.isAuthenticated() == false){
      //this.router.navigate(['/pagina-inicio']);
    }
    else{
      this.rut_deudor = this.auth.obtenerUsuarioActual()!;
      this.id_declaracion = "DEC"+this.rut_deudor+"_"+this.year;
      //this.obtenerDatosDeclaracion();
      this.verificarEstadoDeclaracion();
      this.obtenerDatosDeudor();
    }
  }

  obtenerValorUTM(){
    let year = new Date().getFullYear();

    this.declaracionService.obtenerValorUtm(year).subscribe({
      next: result =>{
        this.utm = result;
      }
    });
  }

  //Verifica si es que existe una declaracion para el año actual que aun no este terminada.
  //Los estado de las declaraciones son : 1-POR TERMINAR, 2-EN REVISION, 3-COMPLETADA 
  verificarEstadoDeclaracion(){
    this.declaracionService.verificarEstadoDeclaracion(this.rut_deudor, this.id_declaracion).subscribe({
      next: result=>{
        if(result.id == null){
          this.existe_declaracion = false;
        }
        else{
          //La declaracion aun no se envia/completa
          if(result.estado == 1){
            this.obtenerDatosDeclaracion();
            this.obtenerDocumentacionDeclaracion();
            this.existe_declaracion = true;
          }
          //La declaracion se reviso y tiene errores que deben corregirse
          else if(result.estado == 4){
            this.corregir_declaracion = true;
            this.obtenerDatosDeclaracion();
            this.obtenerDocumentacionDeclaracion();
            this.obtenerRevision();
            this.existe_declaracion = true;
          }
          else{
            //la declaracion ya se envio y no se debe hacer nada mas con este formulario.
          }
        }
      }
    });
  }

  /*
    Permite obtener los datos personales de un deudor, para ingresarlos automaticamente en la declaracion.
  */
  obtenerDatosDeudor(){
    this.rut_deudor = this.auth.obtenerUsuarioActual()!;

    this.declaracionService.obtenerDatosDeudor(this.rut_deudor).subscribe({
      next: result =>{
        this.datosPersonales.get('rut_deudor')!.setValue(result.rut);
        this.datosPersonales.get('nombres')!.setValue(result.nombres);
        this.datosPersonales.get('ap_paterno')!.setValue(result.ap_paterno);
        this.datosPersonales.get('ap_materno')!.setValue(result.ap_materno);
      }
    });
  }
  
  /*
    Obtiene los datos de la declaracion (datos personales, ingresos, conyuge y documentos) 
    del año actual y que aun no se finaliza.
  */
  obtenerDatosDeclaracion(){
    this.declaracionService.obtenerDatosDeclaracion(this.id_declaracion,this.rut_deudor).subscribe({
      next: result => {
        this.datosPersonales.get('id')!.setValue(this.id_declaracion);
        this.datosPersonales.get('rut_deudor')!.setValue(result.rut_deudor);
        this.datosPersonales.get('nombres')!.setValue(result.nombres);
        this.datosPersonales.get('ap_paterno')!.setValue(result.ap_paterno);
        this.datosPersonales.get('ap_materno')!.setValue(result.ap_materno);
        this.datosPersonales.get('correo')!.setValue(result.correo);
        this.datosPersonales.get('direccion')!.setValue(result.direccion);
        this.datosPersonales.get('telefono')!.setValue(result.telefono);
        this.datosPersonales.get('estado_civil')!.setValue(result.estado_civil);
        this.datosPersonales.get('afp')!.setValue(result.afp);
        this.datosPersonales.get('trabajo')!.setValue(result.trabajo);
        this.datosPersonales.get('tel_trabajo')!.setValue(result.tel_trabajo);
        this.datosPersonales.get('region')!.setValue(result.region);
        this.datosPersonales.get('comuna')!.setValue(result.comuna);
        this.datosPersonales.get('ciudad')!.setValue(result.ciudad);

        this.ingresosDeudor.get('enero')!.setValue(result.enero);
        this.ingresosDeudor.get('febrero')!.setValue(result.febrero);
        this.ingresosDeudor.get('marzo')!.setValue(result.marzo);
        this.ingresosDeudor.get('abril')!.setValue(result.abril);
        this.ingresosDeudor.get('mayo')!.setValue(result.mayo);
        this.ingresosDeudor.get('junio')!.setValue(result.junio);
        this.ingresosDeudor.get('julio')!.setValue(result.julio);
        this.ingresosDeudor.get('agosto')!.setValue(result.agosto);
        this.ingresosDeudor.get('septiembre')!.setValue(result.septiembre);
        this.ingresosDeudor.get('octubre')!.setValue(result.octubre);
        this.ingresosDeudor.get('noviembre')!.setValue(result.noviembre);
        this.ingresosDeudor.get('diciembre')!.setValue(result.diciembre);

        this.ingresosDeudor.get('enero_utm')!.setValue(result.enero_utm);
        this.ingresosDeudor.get('febrero_utm')!.setValue(result.febrero_utm);
        this.ingresosDeudor.get('marzo_utm')!.setValue(result.marzo_utm);
        this.ingresosDeudor.get('abril_utm')!.setValue(result.abril_utm);
        this.ingresosDeudor.get('mayo_utm')!.setValue(result.mayo_utm);
        this.ingresosDeudor.get('junio_utm')!.setValue(result.junio_utm);
        this.ingresosDeudor.get('julio_utm')!.setValue(result.julio_utm);
        this.ingresosDeudor.get('agosto_utm')!.setValue(result.agosto_utm);
        this.ingresosDeudor.get('septiembre_utm')!.setValue(result.septiembre_utm);
        this.ingresosDeudor.get('octubre_utm')!.setValue(result.octubre_utm);
        this.ingresosDeudor.get('noviembre_utm')!.setValue(result.noviembre_utm);
        this.ingresosDeudor.get('diciembre_utm')!.setValue(result.diciembre_utm);

        this.seleccionarComunas(this.datosPersonales.get('region')!.value);

        if(result.estado_civil == 2){
          this.tieneHijos = true;
        }

        //obtiene el conyuge de la declaracion (si es que existe en la BD)
        this.declaracionService.obtenerConyugeDeclaracion(this.rut_deudor, this.id_declaracion).subscribe({
          next: result =>{
            if(result.id != null){
              this.conyuge.get('rut_conyuge')!.setValue(result.rut);
              this.conyuge.get('nombres')!.setValue(result.nombres);
              this.conyuge.get('ap_paterno')!.setValue(result.ap_paterno);
              this.conyuge.get('ap_materno')!.setValue(result.ap_materno);
              this.conyuge.get('enero')!.setValue(result.enero);
              this.conyuge.get('febrero')!.setValue(result.febrero);
              this.conyuge.get('marzo')!.setValue(result.marzo);
              this.conyuge.get('abril')!.setValue(result.abril);
              this.conyuge.get('mayo')!.setValue(result.mayo);
              this.conyuge.get('junio')!.setValue(result.junio);
              this.conyuge.get('julio')!.setValue(result.julio);
              this.conyuge.get('agosto')!.setValue(result.agosto);
              this.conyuge.get('septiembre')!.setValue(result.septiembre);
              this.conyuge.get('octubre')!.setValue(result.octubre);
              this.conyuge.get('noviembre')!.setValue(result.noviembre);
              this.conyuge.get('diciembre')!.setValue(result.diciembre);
      
              this.conyuge.get('enero_utm')!.setValue(result.enero_utm);
              this.conyuge.get('febrero_utm')!.setValue(result.febrero_utm);
              this.conyuge.get('marzo_utm')!.setValue(result.marzo_utm);
              this.conyuge.get('abril_utm')!.setValue(result.abril_utm);
              this.conyuge.get('mayo_utm')!.setValue(result.mayo_utm);
              this.conyuge.get('junio_utm')!.setValue(result.junio_utm);
              this.conyuge.get('julio_utm')!.setValue(result.julio_utm);
              this.conyuge.get('agosto_utm')!.setValue(result.agosto_utm);
              this.conyuge.get('septiembre_utm')!.setValue(result.septiembre_utm);
              this.conyuge.get('octubre_utm')!.setValue(result.octubre_utm);
              this.conyuge.get('noviembre_utm')!.setValue(result.noviembre_utm);
              this.conyuge.get('diciembre_utm')!.setValue(result.diciembre_utm);

              this.casado = true;
            }
          }
        });
      },
      error: result => {
        console.log(result);
      }
    });
  }

  registrarDeclaracion(){
    let datosDeclaracion = this.datosPersonales.value;
    datosDeclaracion.id = this.id_declaracion;

    //si la declaracion no existe en la base de datos, entonces se crea una nueva
    //de lo contrario solo se actualizan los datos.
    if(this.existe_declaracion == false){
      this.declaracionService.registrarDatosPersonales(datosDeclaracion).subscribe({
        next: result =>{
          this.declaracionService.mostrarNotificacion(result, "Cerrar");
        }, 
        error: result =>{
          console.log(result);
        }
      });
    }
    else{
      this.declaracionService.actualizarDatosPersonales(datosDeclaracion).subscribe({
        next: result =>{
          this.declaracionService.mostrarNotificacion(result, "Cerrar");
        }, 
        error: result =>{
          console.log(result);
        }
      });
    }
  }

  /*
    Permite registrar/actualizar los ingresos de una declaracion (inicialmente se ingresan con valor cero en la BD)
  */  
  registrarIngresosDeclaracion(){
    let ingresosDeclaracion = this.ingresosDeudor.value;

    this.declaracionService.registrarIngresosDeudor(this.rut_deudor, this.id_declaracion ,ingresosDeclaracion).subscribe({
      next: result =>{
        this.declaracionService.mostrarNotificacion(result, "Cerrar");
      }, 
      error: result =>{
        console.log(result);
      }
    });
  }

  /*
    Permite registrar los datos del conyuge en la base de datos. Primero verifica si es que la declaracion 
    que se esta realizando ya tiene un conyuge asociado y procede a registrar o actualizar segun corresponda.
  */
  registrarConyuge(){
    let datosConyugeDeclaracion = this.conyuge.value;

    this.declaracionService.obtenerConyugeDeclaracion(this.id_declaracion, this.rut_deudor).subscribe({
      next: result =>{

        //si la declaracion no tiene ningun conyuge asociado, entonces se registra uno.
        if(result.id == null){
          this.declaracionService.registrarConyuge(this.id_declaracion, this.rut_deudor, datosConyugeDeclaracion).subscribe({
            next: result =>{
              console.log(result);
            }, 
            error: result =>{
              console.log(result);
            }
          });
        }
        //si ya existe un conyuge asociado, entonces solo se actualizan los datos.
        else{
          this.declaracionService.actualizarDatosConyuge(this.id_declaracion, this.rut_deudor, datosConyugeDeclaracion).subscribe({
            next: result =>{
              console.log(result);
            }, 
            error: result =>{
              console.log(result);
            }
          });
        }
      }, 
      error: result =>{
        console.log(result);
      }
    });
  }

  upload(tipo_documento:string, event: any){
    let documento = event.target.files[0];

    switch(tipo_documento) { 
      case "RENTAS_DEUDOR": { 
        //let documento = event.target.files[0];
        this.documento_renta = documento;
        break; 
      } 
      case "RENTAS_CONYUGE": { 
        //let documento = event.target.files[0];
        this.documento_renta_conyuge = documento;
        break; 
      } 
      case "CERTIFICADO_COTIZACIONES": { 
        //let documento = event.target.files[0];
        this.documento_cotizaciones = documento;
        break; 
      } 
      case "FORMULARIO_N22": { 
        //let documento = event.target.files[0];
        this.documento_formulario22 = documento;
        break; 
      } 
      case "LIBRETA_MATRIMONIO": { 
        //let documento = event.target.files[0];
        this.documento_libreta_matrimonio = documento; 
        break; 
      } 
      case "DEC_JURADA_SIMPLE_DEUDOR": { 
        //let documento = event.target.files[0];
        this.documento_declaracion_sin_ingresos = documento;
        break; 
      } 
      case "DEC_JURADA_SIMPLE_CONYUGE": { 
        //let documento = event.target.files[0];
        this.documento_declaracion_sin_ingresos_conyuge = documento;
        break; 
      } 
      case "FINIQUITO_DEUDOR": { 
        //let documento = event.target.files[0];
        this.documento_finiquito = documento; 
        break; 
      }
      case "FINIQUITO_CONYUGE": { 
        //let documento = event.target.files[0];
        this.documento_finiquito_conyuge = documento;
        break; 
      } 
      case "CERT_NACIMIENTO": { 
        //let documento = event.target.files[0];
        this.documento_cert_nacimiento = documento; 
        break; 
      } 
      case "CARPETA_TRIBUTARIA_DEUDOR": { 
        //let documento = event.target.files[0];
        this.documento_carp_tributaria_deudor = documento;
        break; 
      } 
      case "CARPETA_TRIBUTARIA_CONYUGE": { 
        //let documento = event.target.files[0];
        this.documento_carp_tributaria_conyuge = documento;
        break; 
      } 
      case "PAGARE_CONYUGE": { 
        //let documento = event.target.files[0];
        this.documento_copia_pagare_conyuge = documento; 
        break; 
      } 
      default: { 
          console.log("El tipo de documento no esta registrado en el sistema");
          break; 
      }
    } 
  }

  subirDocumentoRentaDeudor(){
    this.declaracionService.subirDocumentacionDeclaracion(this.rut_deudor, this.id_declaracion, "CERTIFICADO DE RENTAS", "RENTA_DEUDOR",this.documento_renta);
  }

  subirDocumentoRentaConyuge(){
    this.declaracionService.subirDocumentacionDeclaracion(this.rut_deudor, this.id_declaracion, "CERTIFICADO DE RENTAS CONYUGE", "RENTA_CONYUGE",this.documento_renta_conyuge);
  }

  subirDocumentoCotizaciones(){
    this.declaracionService.subirDocumentacionDeclaracion(this.rut_deudor, this.id_declaracion, "COTIZACIONES","CERTIFICADO_COTIZACIONES",this.documento_cotizaciones);
  }

  subirDocumentoFormulario22(){
    this.declaracionService.subirDocumentacionDeclaracion(this.rut_deudor, this.id_declaracion, "FORMULARIO 22","FORMULARIO_N22",this.documento_formulario22);
  }

  subirDocumentoLibretaMatrimonio(){
    this.declaracionService.subirDocumentacionDeclaracion(this.rut_deudor, this.id_declaracion, "LIBRETA DE MATRIMONIO", "LIBRETA_MATRIMONIO",this.documento_libreta_matrimonio);
  }

  subirDocumentoDecJuradaDeudor(){
    this.declaracionService.subirDocumentacionDeclaracion(this.rut_deudor, this.id_declaracion, "DECLARACION JURADA SIMPLE DEUDOR","DEC_JURADA_SIMPLE_DEUDOR",this.documento_declaracion_sin_ingresos);
  }

  subirDocumentoDecJuradaConyuge(){
    this.declaracionService.subirDocumentacionDeclaracion(this.rut_deudor, this.id_declaracion, "DECLARACION JURADA SIMPLE CONYUGE","DEC_JURADA_SIMPLE_CONYUGE",this.documento_declaracion_sin_ingresos_conyuge);
  }

  subirDocumentoFinitoDeudor(){
    this.declaracionService.subirDocumentacionDeclaracion(this.rut_deudor, this.id_declaracion, "FINIQUITO DEUDOR","FINIQUITO_DEUDOR",this.documento_finiquito);
  }

  subirDocumentoFinitoConyuge(){
    this.declaracionService.subirDocumentacionDeclaracion(this.rut_deudor, this.id_declaracion, "FINIQUITO CONYUGE","FINIQUITO_CONYUGE",this.documento_finiquito_conyuge);
  }

  subirDocumentoCertNacimiento(){
    this.declaracionService.subirDocumentacionDeclaracion(this.rut_deudor, this.id_declaracion, "CERTIFICADO DE NACIMIENTO","CERT_NACIMIENTO",this.documento_cert_nacimiento);
  }

  subirDocumentoCarpTributariaDeudor(){
    this.declaracionService.subirDocumentacionDeclaracion(this.rut_deudor, this.id_declaracion, "CARPETA TRIBUTARIA DEUDOR","CARPETA_TRIBUTARIA_DEUDOR",this.documento_carp_tributaria_deudor);
  }

  subirDocumentoCarpTributariaConyuge(){
    this.declaracionService.subirDocumentacionDeclaracion(this.rut_deudor, this.id_declaracion, "CARPETA TRIBUTARIA CONYUGE","CARPETA_TRIBUTARIA_CONYUGE",this.documento_carp_tributaria_conyuge);
  }

  subirDocumentoPagareConyuge(){
    this.declaracionService.subirDocumentacionDeclaracion(this.rut_deudor, this.id_declaracion, "COPIA DE PAGARE CONYUGE","PAGARE_CONYUGE",this.documento_copia_pagare_conyuge);
  }

  obtenerDocumentacionDeclaracion(){
    this.declaracionService.obtenerDocumentacionDeclaracion(this.rut_deudor, this.id_declaracion).subscribe({
      next: documentos =>{
        documentos.forEach(documento=>{
          this.declaracionService.obtenerArchivoDeclaracion(this.rut_deudor, this.id_declaracion, documento.id, documento.nombre).subscribe({
            next: archivo =>{
              switch(documento.tipo) { 
                case "RENTAS_DEUDOR": { 
                  this.documento_renta = archivo;
                  break; 
                } 
                case "RENTAS_CONYUGE": { 
                  this.documento_renta_conyuge = archivo;
                  break; 
                } 
                case "CERTIFICADO_COTIZACIONES": { 
                  this.documento_cotizaciones = archivo;
                  break; 
                } 
                case "FORMULARIO_N22": { 
                  this.documento_formulario22 = archivo;
                  break; 
                } 
                case "LIBRETA_MATRIMONIO": { 
                  this.documento_libreta_matrimonio = archivo; 
                  break; 
                } 
                case "DEC_JURADA_SIMPLE_DEUDOR": { 
                  this.documento_declaracion_sin_ingresos = archivo;
                  break; 
                } 
                case "DEC_JURADA_SIMPLE_CONYUGE": { 
                  this.documento_declaracion_sin_ingresos_conyuge = archivo;
                  break; 
                } 
                case "FINIQUITO_DEUDOR": { 
                  this.documento_finiquito = archivo; 
                  break; 
                }
                case "FINIQUITO_CONYUGE": { 
                  this.documento_finiquito_conyuge = archivo;
                  break; 
                } 
                case "CERT_NACIMIENTO": { 
                  this.documento_cert_nacimiento = archivo; 
                  break; 
                } 
                case "CARPETA_TRIBUTARIA_DEUDOR": { 
                  this.documento_carp_tributaria_deudor = archivo;
                  break; 
                } 
                case "CARPETA_TRIBUTARIA_CONYUGE": { 
                  this.documento_carp_tributaria_conyuge = archivo;
                  break; 
                } 
                case "PAGARE_CONYUGE": { 
                  this.documento_copia_pagare_conyuge = archivo; 
                  break; 
                } 
                default: { 
                    console.log("El tipo de documento no esta registrado en el sistema");
                    break; 
                }
              }
            }
          });
        });
      }
    });
  }

  seleccionarComunas(region: string) {
    for(let elemento of this.regiones){
      if(elemento.nombre == region){
        this.comunas = elemento.comunas;
      }
    }
    console.log(region);
  }

  /*
    Convierte los ingresos del deudor de peso a utm cada vez que se actualiza o ingresa un nuevo valor.
  */
  convertirUTM(event: Event){
    const idInput = (event.target as HTMLInputElement).id;
    const valor = (event.target as HTMLInputElement).value;

    for(let ingreso of this.ingresos){
      if(ingreso.id == idInput){
        const valor_utm = ingreso.valor.replace(".","");
        let nuevo_valor = parseInt(valor)/parseInt(valor_utm);
        nuevo_valor = Math.round(nuevo_valor * 100) / 100

        this.ingresosDeudor.get(ingreso.formControlUTM)!.setValue(nuevo_valor);
      }
    }

    this.calcularIngresoTotalDeudor();
    this.verificarDecJuradaSimpleDeudor();
  }

  convertirUTMConyuge(event: Event){
    const idInput = (event.target as HTMLInputElement).id;
    const valor = (event.target as HTMLInputElement).value;

    for(let ingreso of this.ingresos){
      if(ingreso.id == idInput){
        const valor_utm = ingreso.valor.replace(".","");
        let nuevo_valor = parseInt(valor)/parseInt(valor_utm);
        nuevo_valor = Math.round(nuevo_valor * 100) / 100

        this.conyuge.get(ingreso.formControlUTM)!.setValue(nuevo_valor);
      }
    }
  }

  verificacionEstadoCivil(valor: number){
    if(valor == 2){
      this.tieneHijos = true;
    }
    else if(valor == 3){
      this.casado = true;
    }
    else if(valor == 4){
      this.casadoReprog = true;
    }
    else{
      this.casado = false;
      this.casadoReprog = false;
    }
  }

  calcularIngresoTotalDeudor(){
    let total = 0;
    let total_utm = 0;

    total = parseInt(this.ingresosDeudor.get('enero')!.value) +
    parseInt(this.ingresosDeudor.get('febrero')!.value) +
    parseInt(this.ingresosDeudor.get('marzo')!.value) +
    parseInt(this.ingresosDeudor.get('abril')!.value) +
    parseInt(this.ingresosDeudor.get('mayo')!.value) +
    parseInt(this.ingresosDeudor.get('junio')!.value) +
    parseInt(this.ingresosDeudor.get('julio')!.value) +
    parseInt(this.ingresosDeudor.get('agosto')!.value) +
    parseInt(this.ingresosDeudor.get('septiembre')!.value) +
    parseInt(this.ingresosDeudor.get('octubre')!.value) + 
    parseInt(this.ingresosDeudor.get('noviembre')!.value) + 
    parseInt(this.ingresosDeudor.get('diciembre')!.value);

    total_utm = this.ingresosDeudor.get('enero_utm')!.value +
    this.ingresosDeudor.get('febrero_utm')!.value +
    this.ingresosDeudor.get('marzo_utm')!.value +
    this.ingresosDeudor.get('abril_utm')!.value +
    this.ingresosDeudor.get('mayo_utm')!.value +
    this.ingresosDeudor.get('junio_utm')!.value +
    this.ingresosDeudor.get('julio_utm')!.value +
    this.ingresosDeudor.get('agosto_utm')!.value +
    this.ingresosDeudor.get('septiembre_utm')!.value +
    this.ingresosDeudor.get('octubre_utm')!.value + 
    this.ingresosDeudor.get('noviembre_utm')!.value + 
    this.ingresosDeudor.get('diciembre_utm')!.value;

    this.ingresosDeudor.get('ingreso_total_deudor')!.setValue(total);
    this.ingresosDeudor.get('ingreso_total_deudor_utm')!.setValue(total_utm);
  }

  calcularIngresoTotalConyuge(){

    let total = 0;
    let total_utm = 0;

    total = parseInt(this.conyuge.get('enero')!.value) +
    parseInt(this.conyuge.get('febrero')!.value) +
    parseInt(this.conyuge.get('marzo')!.value) +
    parseInt(this.conyuge.get('abril')!.value) +
    parseInt(this.conyuge.get('mayo')!.value) +
    parseInt(this.conyuge.get('junio')!.value) +
    parseInt(this.conyuge.get('julio')!.value) +
    parseInt(this.conyuge.get('agosto')!.value) +
    parseInt(this.conyuge.get('septiembre')!.value) +
    parseInt(this.conyuge.get('octubre')!.value) + 
    parseInt(this.conyuge.get('noviembre')!.value) + 
    parseInt(this.conyuge.get('diciembre')!.value);

    total_utm = this.conyuge.get('enero_utm')!.value +
    this.conyuge.get('febrero_utm')!.value +
    this.conyuge.get('marzo_utm')!.value +
    this.conyuge.get('abril_utm')!.value +
    this.conyuge.get('mayo_utm')!.value +
    this.conyuge.get('junio_utm')!.value +
    this.conyuge.get('julio_utm')!.value +
    this.conyuge.get('agosto_utm')!.value +
    this.conyuge.get('septiembre_utm')!.value +
    this.conyuge.get('octubre_utm')!.value + 
    this.conyuge.get('noviembre_utm')!.value + 
    this.conyuge.get('diciembre_utm')!.value;

    this.ingresosDeudor.get('ingreso_total_conyuge')!.setValue(total);
    this.ingresosDeudor.get('ingreso_total_conyuge_utm')!.setValue(total_utm);
  }

  verificarDecJuradaSimpleDeudor(){
    let contador = 0;
    let decJuradaSimpleDeudor = false;
    let formControl;

    let meses = ["enero", "febrero", "marzo", "abril", ""];

    for(let ingreso in this.ingresosDeudor.controls){
      formControl = this.ingresosDeudor.get(ingreso)!;

      if(formControl.value == 0){
        contador++;
      }
      else{
        contador = 0;
      }

      if(contador >= 3){
        decJuradaSimpleDeudor = true;
      }
    }
  }

  verificarDecJuradaSimpleConyuge(){

  }

  finalizarDeclaracion(){
    this.declaracionService.actualizarEstadoDeclaracion(this.rut_deudor, this.id_declaracion, 2).subscribe({
      next: result =>{
        this.declaracionService.mostrarNotificacion("La Declaración se ha enviado correctamente.", "Cerrar");
        this.router.navigate(['/home-deudor']);
      }
    });
  }

  visualizarPDF(tipo_documento: string){
    this.declaracionService.obtenerUrlArchivo(this.id_declaracion, tipo_documento).subscribe({
      next: result =>{
        window.open(result.toString(), '_blank');
      }
    });
  }

  obtenerRevision(){
    this.declaracionService.obtenerRevision(this.id_declaracion).subscribe({
      next: result =>{
        this.comentarios.setValue(result[0].comentarios);
      }
    });
  }
}
