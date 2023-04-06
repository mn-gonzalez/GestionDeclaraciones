import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,FormControl, Validators} from '@angular/forms';
import { DeclaracionService } from "src/app/servicios/declaracion.service";
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { Router } from '@angular/router';

interface Region{
  nombre: string;
  comunas: string[];
}

interface Utm{
  year: number;
  enero: number;
  febrero: number;
  marzo: number;
  abril: number;
  mayo: number;
  junio: number;
  julio: number;
  agosto: number;
  septiembre: number;
  octubre: number;
  noviembre: number;
  diciembre: number;
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

  //Atributo que contiene el rut del conyuge. En el caso de que el deudor este casado.
  rut_conyuge: string;

  //Atributo que contiene el id de los ingresos del coyuge.
  id_ingresos_coyuge: number;

  //Atributo que verifica si la interfaz puede continuar al siguiente paso con campos sin completar.
  isLinear = false;

  //Atributo que verifica si la declaracion ya existe en la base de datos
  existe_declaracion = false;

  //datos para los formularios donde se almacenan los datos ingresados por el deudor
  datosPersonales: FormGroup;
  ingresosDeudor: FormGroup;
  datosConyuge: FormGroup;
  ingresosConyuge: FormGroup;

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
    { nombre: "Arica y Parinacota", comunas: ["Arica", "Camarones", "Putre", "General Lagos"] },
    { nombre: "Tarapacá", comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"]},
    { nombre: "Antofagasta", comunas: ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"]},
    { nombre: "Atacama", comunas: ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"]},
    { nombre: "Coquimbo", comunas: ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"]},
    { nombre: "Valparaíso", comunas: ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"]},
    { nombre: "Región del Libertador Gral. Bernardo O’Higgins", comunas: ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"]},
    { nombre: "Región del Maule", comunas: ["Talca", "Constitución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "ReVro", "San Javier", "Villa Alegre", "Yerbas Buenas"]},
    { nombre: "Región del Biobío", comunas: ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío", "Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"]},
    { nombre: "Región de la Araucanía", comunas: ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"]},
    { nombre: "Región de Los Ríos", comunas: ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"]},
    { nombre: "Región de Los Lagos", comunas: ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "FruVllar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"]},
    { nombre: "Región Aisén del Gral. Carlos Ibáñez del Campo", comunas: ["Coihaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O’Higgins", "Tortel", "Chile Chico", "Río Ibáñez"]},
    { nombre: "Región de Magallanes y de la Antártica Chilena", comunas: ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "AntárVca", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]},
    { nombre: "Región Metropolitana de Santiago", comunas: ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "TilVl", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"]}
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

  //array que indica las columnas que se muestran en la tabla de ingresos e ingresos coyuge
  displayedColumns: string[] = ['mes', 'ingresos_pesos', 'utm', 'ingresos_utm'];

  //indica la fuente desde la cual se obtienen los datos que se muestran en la tabla de ingresos
  dataSource = this.ingresos;

  constructor(private fb: FormBuilder, private declaracionService: DeclaracionService, 
    private auth: InicioSesionService, private router: Router) { 

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

    this.ingresosConyuge = new FormGroup({
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

  documento_renta: File;
  casado = false;

  ngOnInit(): void {
    this.year = new Date().getFullYear();

    if(this.auth.usuario_actual == null){
      this.router.navigate(['/pagina-inicio']);
    }
    else{
      this.rut_deudor = this.auth.usuario_actual;
      this.id_declaracion = "DEC"+this.rut_deudor+"_"+this.year;
      //this.obtenerDatosDeclaracion();
      this.verificarDeclaracionPendiente();
      this.obtenerDatosDeudor();
    }
  }

  obtenerValorUTM(){

  }

  //Verifica si es que existe una declaracion para el año actual que aun no este terminada.
  //Los estado de las declaraciones son : 1-POR TERMINAR, 2-EN REVISION, 3-COMPLETADA 
  verificarDeclaracionPendiente(){
    this.declaracionService.verificarDeclaracionPendiente(this.rut_deudor, this.id_declaracion).subscribe({
      next: result=>{
        if(result.id == null){
          this.existe_declaracion = false;
        }
        else{
          if(result.estado = 1){
            this.obtenerDatosDeclaracion();
            this.existe_declaracion = true;
          }
          else{
            //indicar que la declaracion de este año ya se entrego.
          }
        }
      }
    });
  }

  /*
    Permite obtener los datos personales de un deudor, para ingresarlos automaticamente en la declaracion.
  */
  obtenerDatosDeudor(){
    this.rut_deudor = this.auth.usuario_actual;

    this.declaracionService.obtenerDatosDeudor(this.rut_deudor).subscribe({
      next: result =>{
        this.datosPersonales.get('rut_deudor')!.setValue(result.rut);
        this.datosPersonales.get('nombres')!.setValue(result.nombres);
        this.datosPersonales.get('ap_paterno')!.setValue(result.ap_paterno);
        this.datosPersonales.get('ap_materno')!.setValue(result.ap_materno);
      }
    });
  }

  actualizarValorEnUTM(){
    console.log("Se actualizo el valor");
  }

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
          //console.log(result);
        }, 
        error: result =>{
          console.log(result);
        }
      });
    }
    else{
      this.declaracionService.actualizarDatosPersonales(datosDeclaracion).subscribe({
        next: result =>{
          //console.log(result);
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
        console.log(result);
      }, 
      error: result =>{
        console.log(result);
      }
    });
  }

  registrarDatosConyuge(){
    let datosConyugeDeclaracion = this.ingresosConyuge.value;
    this.rut_conyuge = this.ingresosConyuge.get('rut_conyuge')!.value;

    this.declaracionService.registrarDatosConyuge(datosConyugeDeclaracion).subscribe({
      next: result =>{
        this.declaracionService.registrarIngresosConyuge(this.rut_conyuge, datosConyugeDeclaracion).subscribe({
          next: result =>{
            //console.log(result);
          }, 
          error: result =>{
            console.log(result);
          }
        });
      }, 
      error: result =>{
        this.declaracionService.registrarIngresosConyuge(this.rut_conyuge, datosConyugeDeclaracion).subscribe({
          next: result =>{
            //console.log(result);
          }, 
          error: result =>{
            console.log(result);
          }
        });
      }
    });
  }

  upload(event: any){
    const documento = event.target.files[0];
    this.documento_renta = documento;
  }

  subirDocumentos(){
    this.declaracionService.subirDocumentacionDeclaracion("RENTA",this.documento_renta);
  }

  seleccionarComunas(region: string) {
    for(let elemento of this.regiones){
      if(elemento.nombre == region){
        this.comunas = elemento.comunas;
      }
    }
    console.log(region);
  }

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
  }

  convertirUTMConyuge(event: Event){
    const idInput = (event.target as HTMLInputElement).id;
    const valor = (event.target as HTMLInputElement).value;

    for(let ingreso of this.ingresos){
      if(ingreso.id == idInput){
        const valor_utm = ingreso.valor.replace(".","");
        let nuevo_valor = parseInt(valor)/parseInt(valor_utm);
        nuevo_valor = Math.round(nuevo_valor * 100) / 100

        this.ingresosConyuge.get(ingreso.formControlUTM)!.setValue(nuevo_valor);
      }
    }
  }

  verificacionEstadoCivil(valor: string){
    console.log(valor);
    if(valor == "3"){
      this.casado = true;
    }
    else if(valor == "4"){
      this.casado = true;
    }
    else{
      this.casado = false;
    }
  }

  calcularIngresoTotalDeudor(){
    let total = 0;
    let total_utm = 0;

    total = this.ingresosDeudor.get('enero')!.value +
      this.ingresosDeudor.get('febrero')!.value +
      this.ingresosDeudor.get('marzo')!.value +
      this.ingresosDeudor.get('abril')!.value +
      this.ingresosDeudor.get('mayo')!.value +
      this.ingresosDeudor.get('junio')!.value +
      this.ingresosDeudor.get('julio')!.value +
      this.ingresosDeudor.get('agosto')!.value +
      this.ingresosDeudor.get('septiembre')!.value +
      this.ingresosDeudor.get('octubre')!.value + 
      this.ingresosDeudor.get('noviembre')!.value + 
      this.ingresosDeudor.get('diciembre')!.value;

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

    total = this.ingresosConyuge.get('enero')!.value +
      this.ingresosConyuge.get('febrero')!.value +
      this.ingresosConyuge.get('marzo')!.value +
      this.ingresosConyuge.get('abril')!.value +
      this.ingresosConyuge.get('mayo')!.value +
      this.ingresosConyuge.get('junio')!.value +
      this.ingresosConyuge.get('julio')!.value +
      this.ingresosConyuge.get('agosto')!.value +
      this.ingresosConyuge.get('septiembre')!.value +
      this.ingresosConyuge.get('octubre')!.value + 
      this.ingresosConyuge.get('noviembre')!.value + 
      this.ingresosConyuge.get('diciembre')!.value;

      total_utm = this.ingresosConyuge.get('enero_utm')!.value +
      this.ingresosConyuge.get('febrero_utm')!.value +
      this.ingresosConyuge.get('marzo_utm')!.value +
      this.ingresosConyuge.get('abril_utm')!.value +
      this.ingresosConyuge.get('mayo_utm')!.value +
      this.ingresosConyuge.get('junio_utm')!.value +
      this.ingresosConyuge.get('julio_utm')!.value +
      this.ingresosConyuge.get('agosto_utm')!.value +
      this.ingresosConyuge.get('septiembre_utm')!.value +
      this.ingresosConyuge.get('octubre_utm')!.value + 
      this.ingresosConyuge.get('noviembre_utm')!.value + 
      this.ingresosConyuge.get('diciembre_utm')!.value;

    this.ingresosDeudor.get('ingreso_total_conyuge')!.setValue(total);
    this.ingresosDeudor.get('ingreso_total_conyuge_utm')!.setValue(total_utm);
  }
}
