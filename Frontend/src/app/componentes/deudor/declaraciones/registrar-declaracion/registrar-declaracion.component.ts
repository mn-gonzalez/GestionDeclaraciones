import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,FormControl, Validators} from '@angular/forms';
import { DeclaracionService } from "src/app/servicios/declaracion.service";

interface Region{
  nombre: string;
  comunas: string[];
}

interface Ingreso{
  nombre: string;
  formControl: string;
  valor: string;
  formControlUTM: string;
}

@Component({
  selector: 'app-registrar-declaracion',
  templateUrl: './registrar-declaracion.component.html',
  styleUrls: ['./registrar-declaracion.component.css']
})
export class RegistrarDeclaracionComponent implements OnInit {

  rut_deudor: string;
  id_declaracion: number;
  id_ingresos_deudor: number;
  rut_conyuge: string;
  id_ingresos_coyuge: number;

  isLinear = false;
  datosPersonales: FormGroup;
  ingresosDeudor: FormGroup;
  datosConyuge: FormGroup;
  ingresosConyuge: FormGroup;

  regiones: Region[] = [
    { nombre: "Arica y Parinacota", comunas: ["Arica", "Camarones", "Putre", "General Lagos"] },
    { nombre: "Tarapacá", comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"]},
    { nombre: "Antofagasta", comunas: ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"]},
    { nombre: "Atacama", comunas: ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"]},
    { nombre: "Coquimbo", comunas: ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"]},
    { nombre: "Valparaíso", comunas: ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa María", "Quilpué", "Limache", "Olmué", "Villa Alemana"]},
    { nombre: "Región del Libertador Gral. Bernardo O’Higgins", comunas: ["Rancagua", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "Las Cabras", "Machalí", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requínoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chépica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"]},
    { nombre: "Región del Maule", comunas: ["Talca", "ConsVtución", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Río Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curicó", "Hualañé", "Licantén", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquén", "Linares", "Colbún", "Longaví", "Parral", "ReVro", "San Javier", "Villa Alegre", "Yerbas Buenas"]},
    { nombre: "Región del Biobío", comunas: ["Concepción", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tomé", "Hualpén", "Lebu", "Arauco", "Cañete", "Contulmo", "Curanilahue", "Los Álamos", "Tirúa", "Los Ángeles", "Antuco", "Cabrero", "Laja", "Mulchén", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Bárbara", "Tucapel", "Yumbel", "Alto Biobío", "Chillán", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillán Viejo", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"]},
    { nombre: "Región de la Araucanía", comunas: ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquén", "Pucón", "Saavedra", "Teodoro Schmidt", "Toltén", "Vilcún", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautín", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Purén", "Renaico", "Traiguén", "Victoria"]},
    { nombre: "Región de Los Ríos", comunas: ["Valdivia", "Corral", "Lanco", "Los Lagos", "Máfil", "Mariquina", "Paillaco", "Panguipulli", "La Unión", "Futrono", "Lago Ranco", "Río Bueno"]},
    { nombre: "Región de Los Lagos", comunas: ["Puerto Montt", "Calbuco", "Cochamó", "Fresia", "FruVllar", "Los Muermos", "Llanquihue", "Maullín", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Vélez", "Dalcahue", "Puqueldón", "Queilén", "Quellón", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Río Negro", "San Juan de la Costa", "San Pablo", "Chaitén", "Futaleufú", "Hualaihué", "Palena"]},
    { nombre: "Región Aisén del Gral. Carlos Ibáñez del Campo", comunas: ["Coihaique", "Lago Verde", "Aisén", "Cisnes", "Guaitecas", "Cochrane", "O’Higgins", "Tortel", "Chile Chico", "Río Ibáñez"]},
    { nombre: "Región de Magallanes y de la Antártica Chilena", comunas: ["Punta Arenas", "Laguna Blanca", "Río Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "AntárVca", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]},
    { nombre: "Región Metropolitana de Santiago", comunas: ["Cerrillos", "Cerro Navia", "Conchalí", "El Bosque", "Estación Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Ñuñoa", "Pedro Aguirre Cerda", "Peñalolén", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquín", "San Miguel", "San Ramón", "Vitacura", "Puente Alto", "Pirque", "San José de Maipo", "Colina", "Lampa", "TilVl", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhué", "Curacaví", "María Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Peñaflor"]}
  ];

  ingresos: Ingreso[] = [
    {nombre: "Enero", formControl:"enero", valor:"49.673",formControlUTM:"enero_utm" },
    {nombre: "Febrero", formControl:"febrero",valor:"49.723", formControlUTM:"febrero_utm"},
    {nombre: "Marzo", formControl:"marzo", valor:"50.021", formControlUTM:"marzo_utm"},
    {nombre: "Abril", formControl:"abril", valor:"50.221", formControlUTM:"abril_utm"},
    {nombre: "Mayo", formControl:"mayo", valor:"50.372",formControlUTM:"mayo_utm"},
    {nombre: "Junio", formControl:"junio", valor:"50.372", formControlUTM:"junio_utm"},
    {nombre: "Julio", formControl:"julio", valor:"50.322", formControlUTM:"julio_utm"},
    {nombre: "Agosto", formControl:"agosto",valor:"50.272", formControlUTM:"agosto_utm"},
    {nombre: "Septiembre", formControl:"septiembre", valor:"50.322", formControlUTM:"septiembre_utm"},
    {nombre: "Octubre", formControl:"octubre", valor:"50.372", formControlUTM:"octubre_utm"},
    {nombre: "Noviembre", formControl:"noviembre", valor:"50.674", formControlUTM:"noviembre_utm"},
    {nombre: "Diciembre",  formControl:"diciembre", valor:"51.029",formControlUTM:"diciembre_utm"}
  ];

  displayedColumns: string[] = ['mes', 'ingresos_pesos', 'utm', 'ingresos_utm'];
  dataSource = this.ingresos;

  constructor(private fb: FormBuilder, private declaracionService: DeclaracionService) { 
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
      'diciembre_utm': new FormControl(0)
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

  ngOnInit(): void {
    //this.obtenerDatosDeclaracion();
  }

  obtenerIdDeclaracionPendiente(){

  }

  actualizarValorEnUTM(){
    console.log("Se actualizo el valor");
  }

  obtenerDatosDeclaracion(){
    this.id_declaracion = 2;
    this.declaracionService.obtenerDatosDeclaracion(this.id_declaracion).subscribe({
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
      },
      error: result => {
        console.log(result);
      }
    });
  }

  registrarDeclaracion(){
    let datosDeclaracion = this.datosPersonales.value;

    this.declaracionService.registrarDatosPersonales(datosDeclaracion).subscribe({
      next: result =>{
        //console.log(result);
      }, 
      error: result =>{
        console.log(result);
      }
    });
  }

  registrarIngresosDeclaracion(){
    let ingresosDeclaracion = this.ingresosDeudor.value;
    this.id_declaracion = 2;
    this.rut_deudor = '18892403';

    this.declaracionService.registrarIngresosDeudor(this.rut_deudor, this.id_declaracion ,ingresosDeclaracion).subscribe({
      next: result =>{
        //console.log(result);
      }, 
      error: result =>{
        console.log(result);
      }
    });
  }

  registrarDatosConyuge(){
    let datosConyugeDeclaracion = this.ingresosConyuge.value;
    this.id_declaracion = 2;
    this.rut_conyuge = this.ingresosConyuge.get('rut_conyuge')!.value;
    this.rut_deudor = '18892403';

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
        console.log(result);
      }
    });
  }

  verificarDeclaracionPendiente(){
    
  }

}
