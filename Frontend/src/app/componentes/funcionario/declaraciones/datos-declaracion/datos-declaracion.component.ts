import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,FormControl, Validators} from '@angular/forms';
import { DeclaracionService } from "src/app/servicios/declaracion.service";
import { ActivatedRoute } from '@angular/router';

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
  selector: 'app-datos-declaracion',
  templateUrl: './datos-declaracion.component.html',
  styleUrls: ['./datos-declaracion.component.css']
})
export class DatosDeclaracionComponent implements OnInit {
  rut_deudor: string;
  id_declaracion: string;
  id_ingresos_deudor: number;
  rut_conyuge: string;
  id_ingresos_coyuge: number;

  isLinear = false;
  datosPersonales: FormGroup;
  ingresosDeudor: FormGroup;
  conyuge: FormGroup;

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

  displayedColumns: string[] = ['mes', 'ingresos_pesos', 'utm', 'ingresos_utm'];
  dataSource = this.ingresos;

  casado = false;
  tieneHijos = false;
  casadoReprog = false;
  deudorDebePresentarDecSimple = false;
  conyugeDebePresentarDecSimple = false;
  year: number;

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

  constructor(private declaracionService: DeclaracionService, private activatedRoute: ActivatedRoute) {
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
  }

  ngOnInit(): void {
    this.id_declaracion = this.activatedRoute.snapshot.paramMap.get('id') || "";
    this.obtenerDatosDeclaracion(); 
    this.obtenerDocumentacionDeclaracion();
  }

  obtenerDatosDeclaracion(){
    this.declaracionService.obtenerDatosDeclaracion(this.id_declaracion, this.rut_deudor).subscribe({
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

        this.year = result.anio;

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

  seleccionarComunas(region: string) {
    for(let elemento of this.regiones){
      if(elemento.nombre == region){
        this.comunas = elemento.comunas;
      }
    }
    console.log(region);
  }

  convertirValorAfp(valor_afp: number){
    switch(valor_afp){
      case 1:
        this.datosPersonales.get('afp')!.setValue("CAPITAL");
        break;

      case 2:
        this.datosPersonales.get('afp')!.setValue("CUPRUM");
        break;

      case 3:
        this.datosPersonales.get('afp')!.setValue("HABITAT");
        break;
      
      case 4:
        this.datosPersonales.get('afp')!.setValue("MODELO");
        break;
      
      case 5:
        this.datosPersonales.get('afp')!.setValue("PLAVITAL");
        break;

      case 6:
        this.datosPersonales.get('afp')!.setValue("PROVIDA");
        break;

      case 7:
        this.datosPersonales.get('afp')!.setValue("UNO");
        break;
    }
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

  visualizarPDF(tipo_documento: string){
    /*
    this.declaracionService.obtenerUrlArchivo(this.id_declaracion, tipo_documento).subscribe({
      next: result =>{
        window.open(result.toString(), '_blank');
      }
    });
  }
  */

  var blob = new Blob;

    switch(tipo_documento) { 
      case "RENTAS_DEUDOR": { 
        blob = new Blob([this.documento_renta], {type: 'application/pdf'});
        break; 
      } 
      case "RENTAS_CONYUGE": {
        blob = new Blob([ this.documento_renta_conyuge], {type: 'application/pdf'});
        break; 
      } 
      case "CERTIFICADO_COTIZACIONES": {
        blob = new Blob([this.documento_cotizaciones], {type: 'application/pdf'});
        break; 
      } 
      case "FORMULARIO_N22": {
        blob = new Blob([this.documento_formulario22], {type: 'application/pdf'});
        break; 
      } 
      case "LIBRETA_MATRIMONIO": { 
        blob = new Blob([this.documento_libreta_matrimonio], {type: 'application/pdf'});
        break; 
      } 
      case "DEC_JURADA_SIMPLE_DEUDOR": {
        blob = new Blob([this.documento_declaracion_sin_ingresos], {type: 'application/pdf'});
        break; 
      } 
      case "DEC_JURADA_SIMPLE_CONYUGE": {
        blob = new Blob([this.documento_declaracion_sin_ingresos_conyuge], {type: 'application/pdf'});
        break; 
      } 
      case "FINIQUITO_DEUDOR": { 
        blob = new Blob([this.documento_finiquito], {type: 'application/pdf'});
        break; 
      }
      case "FINIQUITO_CONYUGE": { 
        blob = new Blob([this.documento_finiquito_conyuge], {type: 'application/pdf'});
        break; 
      } 
      case "CERT_NACIMIENTO": {  
        blob = new Blob([this.documento_cert_nacimiento], {type: 'application/pdf'});
        break; 
      } 
      case "CARPETA_TRIBUTARIA_DEUDOR": { 
        blob = new Blob([this.documento_carp_tributaria_deudor], {type: 'application/pdf'});
        break; 
      } 
      case "CARPETA_TRIBUTARIA_CONYUGE": { 
        blob = new Blob([this.documento_carp_tributaria_conyuge], {type: 'application/pdf'});
        break; 
      } 
      case "PAGARE_CONYUGE": { 
        blob = new Blob([this.documento_copia_pagare_conyuge], {type: 'application/pdf'});
        break; 
      } 
      default: { 
          console.log("El tipo de documento no esta registrado en el sistema");
          break; 
      }
    }

    var blobURL = URL.createObjectURL(blob);
    window.open(blobURL);
  }
}
