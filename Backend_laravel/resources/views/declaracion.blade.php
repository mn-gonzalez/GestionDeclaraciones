<!DOCTYPE html>
<html>
	<body>
		<div style="width: 100%; height: 55px;">
			<div style="float: left;">
        <table>
            <tr style="border-spacing: 0px;">
                <td align="center" style="font-size:10pt;"><b>UNIVERSIDAD DE TALCA</b></td>
            </tr>
            <tr style="border-spacing: 0px;">
                <td align="center" style="font-size:8pt;">ADMINISTRACION GENERAL</td>
            </tr>
            <tr style="border-spacing: 0px;">
                <td align="center" style="font-size:8pt;">FONDO SOLIDARIO DE CREDITO UNIVERSITARIO</td>
            </tr>
        </table>
			</div>
		</div>
		<div style="width: 100%; height: 80px;">
      <table style="width: 100%">
        <tr>
            <td colspan="1" style="width:33%;"> <div style="width: 100%;"></div> </td>
            <td colspan="1" style="width:34%;">
              <table>
                <tr style="border-spacing: 0px;">
                    <td align="center" style="font-size:10pt; width: 100%;"><b>DECLARACION JURADA CUOTA {{date('Y')}}</b></td>
                </tr>
                <tr style="border-spacing: 0px;">
                    <td align="center" style="font-size:8pt; width: 100%;">LEY N°19.287, LEY N°19.848 Y LEY N° 20.572</td>
                </tr>
                <tr style="border-spacing: 0px;">
                    <td align="center" style="font-size:8pt; width: 100%;">(RENTAS {{ $data['utm']->year}})</td>
                </tr>
              </table>
            </td>
            <td colspan="1" style="width:33%;">
              <table style="padding-left: 25%; width: 44mm; height: 14mm; font-size: 8pt; text-align: center;">
                <tr>
                  <th style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">RUT DEL DEUDOR</th>
                </tr>
                <tr>
                  <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ $data['declaracion']->rut_deudor }}</td>
                </tr>
              </table>
            </td>
        </tr>
      </table>
		</div>

		<div class="seccion-nombre">
        IDENTIFICACION DEL DEUDOR DE CREDITO UNIVERSITARIO SOLIDARIO
        <div class="nombre">
            <div style="height: 100%; width:32%; float: left; padding-left: 3mm;">
            	<div>APELLIDO PATERNO</div>
            	<div>{{ $data['declaracion']->ap_paterno }}</div>
            </div>
            <div style="height: 100%; width:32%; float: left; padding-left: 3mm;">
            	<div>APELLIDO MATERNO</div>
            	<div>{{ $data['declaracion']->ap_materno }}</div>
            </div>
            <div style="height: 100%; width:32%; float: left; padding-left: 3mm;">
            	<div>NOMBRES</div>
            	<div>{{ $data['declaracion']->nombres }}</div>
            </div>
        </div>
    </div>

    <div class="seccion-direccion">
        <div class="nombre">
        	<div style="height: 100%; width:45%; float: left; padding-left: 3mm;">
            	<div>DIRECCIÓN</div>
            	<div>{{ $data['declaracion']->direccion }}</div>
            </div>
            <div style="height: 100%; width:15%; float: left; padding-left: 3mm;">
            	<div>COMUNA</div>
            	<div>{{ $data['declaracion']->comuna }}</div>
            </div>
            <div style="height: 100%; width:15%; float: left; padding-left: 3mm;">
            	<div>CIUDAD</div>
            	<div>{{ $data['declaracion']->ciudad }}</div>
            </div>
            <div style="height: 100%; width:15%; float: left; padding-left: 3mm;">
            	<div>TELÉFONO</div>
            	<div>{{ $data['declaracion']->telefono }}</div>
            </div>
        </div>
    </div>

    <div class="seccion-trabajo">
        <div class="estado-civil">
            <span style="float: left;  width: 15%;">ESTADO CIVIL</span>
            <div class="valor-estado-civil">
            	<div>{{ $data['declaracion']->estado_civil }}</div>
            </div>
            <div class="opciones-estado">
                <div>1. SOLTERO SIN HIJOS</div>
                <div>2. SOLTERO CON HIJOS</div>
                <div>3. CASADO</div>
                <div>4. CASADO CON DEUDOR REPROG. CRED. UNIV. O FISCAL .........................</div>
            </div>
        </div>

        <div class="trabajo">
            <div style="float: left; height:100%; width: 33%;">
            	<div>INSTITUCIÓN EN LA QUE TRABAJA</div>
            	<div style="padding-top: 1mm;">{{ $data['declaracion']->trabajo }}</div>
            </div>
            <div style="float: left; height:100%; width: 25%;">
            	<div>TELÉFONO DEL TRABAJO</div>
            	<div style="padding-top: 1mm;">{{ $data['declaracion']->tel_trabajo }}</div>
            </div>
            <div style="float: left; height:100%; width: 33%;">
                <div>PRESENTA DECLARACIÓN DE RENTA S.I.I</div>
                <div style="padding-top: 1mm;">SI........    NO........</div>
            </div>
        </div>
    </div>

    <div class="seccion-afp">
        <div class="nombre">
        	<div style="height: 100%; width:33%; float: left; padding-left: 3mm;">
            	<div>AFP DE LA QUE ES AFILIADO</div>
            	<div>{{ $data['declaracion']->afp }}</div>
            </div>
            <div style="height: 100%; width:33%; float: left;">
            	<div>CORREO ELECTRÓNICO DEUDOR</div>
            	<div>{{ $data['declaracion']->correo }}</div>
            </div>
            <div style="height: 100%; width:33%; float: left;">
            	<div>DESEA INFORMACIÓN AL CORREO ELECTRÓNICO</div>
            	<div>NO</div>
            </div>
        </div>
    </div>

    <div class="seccion-conyuge">
        <div class="rut-conyuge" style="padding-left: 3mm;">RUT DEL CONYUGE N° {{ $data['conyuge']->rut }}</div>
        <div class="nombre-conyuge">
        	<div style="height: 100%; width:32%; float: left; padding-left: 3mm;">
            	<div>APELLIDO PATERNO</div>
            	<div>{{ $data['conyuge']->ap_paterno }}</div>
            </div>
            <div style="height: 100%; width:32%; float: left;">
            	<div>APELLIDO MATERNO</div>
            	<div>{{ $data['conyuge']->ap_materno }}</div>
            </div>
            <div style="height: 100%; width:32%; float: left;">
            	<div>NOMBRES</div>
            	<div>{{ $data['conyuge']->nombres }}</div>
            </div>
        </div>
    </div>

    <div class="seccion-ingresos">
    	<table style="width:48%; height:100%; float:right;">
          <tr>
            <th></th>
            <th colspan="3">INGRESOS DEL CONYUGE AÑO {{ $data['utm']->year }}</th>
          </tr>
          <tr>
            <td>MES</td>
            <td>MONTO EN PESOS</td>
            <td>VALOR UTM</td>
            <td>MONTO EN UTM</td>
          </tr>
          <tr>
            <td>ENERO</td>
            <td>{{ $data['conyuge']->enero }}</td>
            <td>$ {{ $data['utm']->enero }}</td>
            <td>{{ $data['conyuge']->enero_utm }}</td>
          </tr>
          <tr>
            <td>FEBRERO</td>
            <td>{{ $data['conyuge']->febrero }}</td>
            <td>$ {{$data['utm']->febrero }}</td>
            <td>{{ $data['conyuge']->febrero_utm }}</td>
          </tr>
          <tr>
            <td>MARZO</td>
            <td>{{ $data['conyuge']->marzo }}</td>
            <td>$ {{ $data['utm']->marzo }}</td>
            <td>{{ $data['conyuge']->marzo_utm }}</td>
          </tr>
          <tr>
            <td>ABRIL</td>
            <td>{{ $data['conyuge']->abril }}</td>
            <td>$ {{ $data['utm']->abril }}</td>
            <td>{{ $data['conyuge']->abril_utm }}</td>
          </tr>
          <tr>
            <td>MAYO</td>
            <td>{{ $data['conyuge']->mayo }}</td>
            <td>$ {{ $data['utm']->mayo }}</td>
            <td>{{ $data['conyuge']->mayo_utm }}</td>
          </tr>
          <tr>
            <td>JUNIO</td>
            <td>{{ $data['conyuge']->junio }}</td>
            <td>$ {{ $data['utm']->junio }}</td>
            <td>{{ $data['conyuge']->junio_utm }}</td>
          </tr>
          <tr>
            <td>JULIO</td>
            <td>{{ $data['conyuge']->julio }}</td>
            <td>$ {{ $data['utm']->julio }}</td>
            <td>{{ $data['conyuge']->julio_utm }}</td>
          </tr>
          <tr>
            <td>AGOSTO</td>
            <td>{{ $data['conyuge']->agosto }}</td>
            <td>$ {{ $data['utm']->agosto }}</td>
            <td>{{ $data['conyuge']->agosto_utm }}</td>
          </tr>
          <tr>
            <td>SEPTIEMBRE</td>
            <td>{{ $data['conyuge']->septiembre }}</td>
            <td>$ {{ $data['utm']->septiembre }}</td>
            <td>{{ $data['conyuge']->septiembre_utm }}</td>
          </tr>
          <tr>
            <td>OCTUBRE</td>
            <td>{{ $data['conyuge']->octubre }}</td>
            <td>$ {{ $data['utm']->octubre }}</td>
            <td>{{ $data['conyuge']->octubre_utm }}</td>
          </tr>
          <tr>
            <td>NOVIEMBRE</td>
            <td>{{ $data['conyuge']->noviembre }}</td>
            <td>$ {{ $data['utm']->noviembre }}</td>
            <td>{{ $data['conyuge']->noviembre_utm }}</td>
          </tr>
          <tr>
            <td>DICIEMBRE</td>
            <td>{{ $data['conyuge']->diciembre }}</td>
            <td>$ {{ $data['utm']->diciembre }}</td>
            <td>{{ $data['conyuge']->diciembre_utm }}</td>
          </tr>
          <tr>
            <td style="border: 0px solid black;"></td>
            <td colspan="2">INGRESOS TOTALES EN UTM</td>
            <td>{{ $data['declaracion']->ingreso_total_conyuge_utm }}</td>
          </tr>
        </table>

        <table style="width:48%; height:100%; float: left;">
          <tr>
            <th></th>
            <th colspan="3">INGRESOS DEL DEUDOR AÑO {{ $data['utm']->year }}</th>
          </tr>
          <tr>
            <td>MES</td>
            <td>MONTO EN PESOS</td>
            <td>VALOR UTM</td>
            <td>MONTO EN UTM</td>
          </tr>
          <tr>
            <td>ENERO</td>
            <td>{{ $data['declaracion']->enero }}</td>
            <td>$ {{ $data['utm']->enero }}</td>
            <td>{{ $data['declaracion']->enero_utm }}</td>
          </tr>
          <tr>
            <td>FEBRERO</td>
            <td>{{ $data['declaracion']->febrero }}</td>
            <td>$ {{$data['utm']->febrero }}</td>
            <td>{{ $data['declaracion']->febrero_utm }}</td>
          </tr>
          <tr>
            <td>MARZO</td>
            <td>{{ $data['declaracion']->marzo }}</td>
            <td>$ {{ $data['utm']->marzo }}</td>
            <td>{{ $data['declaracion']->marzo_utm }}</td>
          </tr>
          <tr>
            <td>ABRIL</td>
            <td>{{ $data['declaracion']->abril }}</td>
            <td>$ {{ $data['utm']->abril }}</td>
            <td>{{ $data['declaracion']->abril_utm }}</td>
          </tr>
          <tr>
            <td>MAYO</td>
            <td>{{ $data['declaracion']->mayo }}</td>
            <td>$ {{ $data['utm']->mayo }}</td>
            <td>{{ $data['declaracion']->mayo_utm }}</td>
          </tr>
          <tr>
            <td>JUNIO</td>
            <td>{{ $data['declaracion']->junio }}</td>
            <td>$ {{ $data['utm']->junio }}</td>
            <td>{{ $data['declaracion']->junio_utm }}</td>
          </tr>
          <tr>
            <td>JULIO</td>
            <td>{{ $data['declaracion']->julio }}</td>
            <td>$ {{ $data['utm']->julio }}</td>
            <td>{{ $data['declaracion']->julio_utm }}</td>
          </tr>
          <tr>
            <td>AGOSTO</td>
            <td>{{ $data['declaracion']->agosto }}</td>
            <td>$ {{ $data['utm']->agosto }}</td>
            <td>{{ $data['declaracion']->agosto_utm }}</td>
          </tr>
          <tr>
            <td>SEPTIEMBRE</td>
            <td>{{ $data['declaracion']->septiembre }}</td>
            <td>$ {{ $data['utm']->septiembre }}</td>
            <td>{{ $data['declaracion']->septiembre_utm }}</td>
          </tr>
          <tr>
            <td>OCTUBRE</td>
            <td>{{ $data['declaracion']->octubre }}</td>
            <td>$ {{ $data['utm']->octubre }}</td>
            <td>{{ $data['declaracion']->octubre_utm }}</td>
          </tr>
          <tr>
            <td>NOVIEMBRE</td>
            <td>{{ $data['declaracion']->noviembre }}</td>
            <td>$ {{ $data['utm']->noviembre }}</td>
            <td>{{ $data['declaracion']->noviembre_utm }}</td>
          </tr>
          <tr>
            <td>DICIEMBRE</td>
            <td>{{ $data['declaracion']->diciembre }}</td>
            <td>$ {{ $data['utm']->diciembre }}</td>
            <td>{{ $data['declaracion']->diciembre_utm }}</td>
          </tr>
          <tr>
            <td style="border: 0px solid black;"></td>
            <td colspan="2">INGRESOS TOTALES EN UTM</td>
            <td>{{ $data['declaracion']->ingreso_total_deudor_utm }}</td>
          </tr>
        </table>
    </div>

        <div class="textos">
            <p>DECLARO BAJO JURAMENTO QUE TODOS LOS DATOS PROPORCIONADOS SON FIDEDIGNOS, ASIMISMO AUTORIZO AL FONDO SOLIDARIO DE CREDITO UNIVERSITARIO, VERIFICAR MIS REMUNERACIONES O RENTA SOBRE LOS CUALES EFECTUO MIS COTIZACIONES PREVISIONALES, PUDIENDO SOLICITAR A LA ADMINISTRADORA DE FONDOS DE PENSIONES.</p>

            <p>NOTA: CUALQUIER ERROR EN ESTE FORMULARIO, SERA RESPONSABILIDAD EXCLUSIVA DEL DEUDOR. NO SE ACEPTAN DECLARACIONES JURADAS FUERA DE PLAZO.<br>
                ● LAS INSTRUCCIONES SE ENCUENTRAN AL REVERSO DE ESTE FORMULARIO.<br>
                ● RECUERDE EL DEJAR UNA COPIA DE SU DECLARACION EN SU PODER.<br>
                ● PUEDE DESCARGAR EL FORMULARIO EN EL LINK: HTTP://INET.UTALCA.CL/CREDITO/ <br></p>
            <br>
            <p>FECHA______________________________________</p>
            <br>
            <br>
        </div>

        <div class="firmas">
            <p class="texto-firmas">______________________________________ <br>
                FIRMA NOTARIO</p>

            <p class="texto-firmas">______________________________________ <br>
                FIRMA DEUDOR</p>
        </div>
	</body>
	

	<style type="text/css">
		.texto-titulo{
			font-size: 10pt;
		}

		.parrafo{
			text-align: center;
			font-size: 8pt;
		}

		.seccion-encabezado{
			width: 100%;
			height: 70px;
		}

		.depto{
			float: left;
		}

		.seccion-titulo{
			width: 100%;
			height: 70px;
		}

		.titulo{
			float: left;
			width: 45%;
		}

		.rut{
			float: left;
  			width: 44mm;
  			height: 14mm;
  			font-size: 8pt;
			text-align: center;
		}

		.texto-rut{
			height: 100%;
			border-style: solid;
  			border-width: 1px;
  			padding-top: 1mm;
		}

		.seccion-nombre{
			font-size: 8pt;
			margin-bottom:10px;
		}

		.nombre{
			border-style: solid;
  			border-width: 2px;
			height: 11mm;
		}

		.seccion-direccion{
			font-size: 8pt;
			padding-bottom:10px;
		}

		.seccion-trabajo{
			border-style: solid;
  			border-width: 2px;
  			font-size: 8pt;
  			margin-bottom:10px;
		}

		.estado-civil{
			padding-left: 3mm;
			border-bottom-style: solid;
  			border-width: 2px;
  			padding-bottom: 2.5mm;
  			height: 20mm;
		}

		.valor-estado-civil{
			float: left;
			border-style: solid;
  			border-width: 2px;
  			width: 14mm;
  			height: 14mm;
  			margin-top: 8px;
  			margin-right: 30px;
		}

		.opciones-estado{
			float: left;
			margin-top: 8px;
		}

		.trabajo{
			padding-left: 3mm;
			height: 13mm;
		}

		.seccion-afp{
			font-size: 8pt;
			margin-bottom:10px;
		}

		.seccion-conyuge{
			width: 99.5%;
			border-style: solid;
  			border-width: 2px;
  			font-size: 8pt;
  			margin-bottom:10px;
		}

		.rut-conyuge{
			display: flex;
			justify-content: flex-start;
			border-bottom-style: solid;
  			border-width: 1.5px;
		}

		.nombre-conyuge{
			display: flex;
			justify-content: space-around;
			/*width: 198mm;*/
			height: 11mm;
		}

		.seccion-ingresos{
			width: 100%;
			font-size: 8pt;
			height: 367px;
		}

		.textos{
			text-align: justify;
  			text-justify: inter-word;
			font-size: 8pt;
		}

		.firmas{
			font-size: 9pt;
		}

		.texto-firmas{
			width: 50%;
			float: left;
			text-align: center;
		}

		table{
		  	border-collapse: collapse;
		}

		/* th, td {
		  border: 2px solid black;
		  border-collapse: collapse;
		  height: 23px;
      text-align: center;
		} */
	</style>

</html>