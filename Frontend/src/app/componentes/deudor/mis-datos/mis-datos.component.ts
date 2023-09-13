import { Component, OnInit } from '@angular/core';
import {FormBuilder, UntypedFormGroup,UntypedFormControl, Validators} from '@angular/forms';
import { DeclaracionService } from 'src/app/servicios/declaracion.service';
import { InicioSesionService } from 'src/app/servicios/inicio-sesion.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

interface Region{
  nombre: string;
  comunas: string[];
}

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.component.html',
  styleUrls: ['./mis-datos.component.css']
})
export class MisDatosComponent implements OnInit {
  datosPersonales: UntypedFormGroup;
  rut_deudor: string;

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

  constructor(private auth: InicioSesionService, private usuarioService: UsuarioService) {
    this.datosPersonales = new UntypedFormGroup({
      'rut': new UntypedFormControl(""),
      'nombres': new UntypedFormControl(""),
      'ap_paterno': new UntypedFormControl(""),
      'ap_materno': new UntypedFormControl(""),
      'direccion': new UntypedFormControl(""),
      'ciudad': new UntypedFormControl(""),
      'comuna': new UntypedFormControl(""),
      'region': new UntypedFormControl(""),
      'telefono': new UntypedFormControl(""),
      'correo': new UntypedFormControl(""),
      'contrasena': new UntypedFormControl("")
    });
  }

  ngOnInit(): void {
    this.obtener_datos();
  }

  obtener_datos(){
    this.rut_deudor = this.auth.obtenerUsuarioActual()!;

    this.usuarioService.obtenerDatosCompletosDeudor(this.rut_deudor).subscribe({
      next: result =>{
        this.datosPersonales.get('rut')!.setValue(result.rut);
        this.datosPersonales.get('nombres')!.setValue(result.nombres);
        this.datosPersonales.get('ap_paterno')!.setValue(result.ap_paterno);
        this.datosPersonales.get('ap_materno')!.setValue(result.ap_materno);
        this.datosPersonales.get('direccion')!.setValue(result.direccion);
        this.datosPersonales.get('ciudad')!.setValue(result.ciudad);
        this.datosPersonales.get('comuna')!.setValue(result.comuna);
        this.datosPersonales.get('region')!.setValue(result.region);
        this.datosPersonales.get('telefono')!.setValue(result.telefono);
        this.datosPersonales.get('correo')!.setValue(result.correo);

        this.seleccionarComunas(result.region);
      }
    });
  }

  seleccionarComunas(region: string) {
    for(let elemento of this.regiones){
      if(elemento.nombre == region){
        this.comunas = elemento.comunas;
      }
    }
  }

  actualizarDatos(){
    let rut_deudor = this.auth.obtenerUsuarioActual()!;

    this.usuarioService.actualizarDatosDeudor(this.datosPersonales.value, rut_deudor).subscribe({
      next: result =>{
        this.usuarioService.mostrarNotificacion(result, "Cerrar");
      }, 
      error: result =>{
        console.log(result);
      }
    });
  }

}
