<!DOCTYPE html>
<html>
	<body>
		<div class="seccion-encabezado">
			<div class="depto">
				<p class="parrafo">
					<b class="texto-titulo">UNIVERSIDAD DE TALCA</b><br>
					ADMINISTRACION GENERAL <br>
				FONDO SOLIDARIO DE CREDITO UNIVERSITARIO</p>
			</div>
		</div>
		<div class="seccion-titulo">
			<div style="float: left; width: 30%; height: 100%;"></div>
			<div class="titulo">
				<p class="parrafo">
					<b class="texto-titulo">DECLARACION JURADA CUOTA {{date('Y')}} </b> <br>
					LEY N°19.287, LEY N°19.848 Y LEY N° 20.572 <br>
					(RENTAS {{ $utm['year'] }})</p>
			</div>
			<div class="rut">
				<table style="width:100%; height:100%;">
					<tr>
						<th>RUT DEL DEUDOR</th>
					</tr>
					<tr>
						<td>{{ $declaracion['rut_deudor'] }}</td>
					</tr>
				</table>
			</div>
		</div>

		<div class="seccion-nombre">
        IDENTIFICACION DEL DEUDOR DE CREDITO UNIVERSITARIO SOLIDARIO
        <div class="nombre">
            <div style="height: 100%; width:32%; float: left; padding-left: 3mm;">
            	<div>APELLIDO PATERNO</div>
            	<div>{{ $declaracion['ap_paterno'] }}</div>
            </div>
            <div style="height: 100%; width:32%; float: left; padding-left: 3mm;">
            	<div>APELLIDO MATERNO</div>
            	<div>{{ $declaracion['ap_materno'] }}</div>
            </div>
            <div style="height: 100%; width:32%; float: left; padding-left: 3mm;">
            	<div>NOMBRES</div>
            	<div>{{ $declaracion['nombres'] }}</div>
            </div>
        </div>
    </div>

    <div class="seccion-direccion">
        <div class="nombre">
        	<div style="height: 100%; width:45%; float: left; padding-left: 3mm;">
            	<div>DIRECCIÓN</div>
            	<div>{{ $declaracion['direccion'] }}</div>
            </div>
            <div style="height: 100%; width:15%; float: left; padding-left: 3mm;">
            	<div>COMUNA</div>
            	<div>{{ $declaracion['comuna'] }}</div>
            </div>
            <div style="height: 100%; width:15%; float: left; padding-left: 3mm;">
            	<div>CIUDAD</div>
            	<div>{{ $declaracion['ciudad'] }}</div>
            </div>
            <div style="height: 100%; width:15%; float: left; padding-left: 3mm;">
            	<div>TELÉFONO</div>
            	<div>{{ $declaracion['telefono'] }}</div>
            </div>
        </div>
    </div>

    <div class="seccion-trabajo">
        <div class="estado-civil">
            <span style="float: left;  width: 15%;">ESTADO CIVIL</span>
            <div class="valor-estado-civil">
            	<div>{{ $declaracion['estado_civil'] }}</div>
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
            	<div style="padding-top: 1mm;">{{ $declaracion['trabajo'] }}</div>
            </div>
            <div style="float: left; height:100%; width: 25%;">
            	<div>TELÉFONO DEL TRABAJO</div>
            	<div style="padding-top: 1mm;">{{ $declaracion['tel_trabajo'] }}</div>
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
            	<div>{{ $declaracion['afp'] }}</div>
            </div>
            <div style="height: 100%; width:33%; float: left;">
            	<div>CORREO ELECTRÓNICO DEUDOR</div>
            	<div>{{ $declaracion['correo'] }}</div>
            </div>
            <div style="height: 100%; width:33%; float: left;">
            	<div>DESEA INFORMACIÓN AL CORREO ELECTRÓNICO</div>
            	<div>NO</div>
            </div>
        </div>
    </div>

    <div class="seccion-conyuge">
        <div class="rut-conyuge" style="padding-left: 3mm;">RUT DEL CONYUGE N°</div>
        <div class="nombre-conyuge">
        	<div style="height: 100%; width:32%; float: left; padding-left: 3mm;">
            	<div>APELLIDO PATERNO</div>
            	<div>{{ $conyuge['ap_paterno'] }}</div>
            </div>
            <div style="height: 100%; width:32%; float: left;">
            	<div>APELLIDO MATERNO</div>
            	<div>{{ $conyuge['ap_materno'] }}</div>
            </div>
            <div style="height: 100%; width:32%; float: left;">
            	<div>NOMBRES</div>
            	<div>{{ $conyuge['nombres'] }}</div>
            </div>
        </div>
    </div>

    <div class="seccion-ingresos">
    	<table style="width:48%; height:100%; float:right;">
          <tr>
            <th></th>
            <th colspan="3">INGRESOS DEL CONYUGE AÑO {{ $utm['year'] }}</th>
          </tr>
          <tr>
            <td>MES</td>
            <td>MONTO EN PESOS</td>
            <td>VALOR UTM</td>
            <td>MONTO EN UTM</td>
          </tr>
          <tr>
            <td>ENERO</td>
            <td>{{ $conyuge['enero'] }}</td>
            <td>$ {{ $utm['enero'] }}</td>
            <td>{{ $conyuge['enero_utm'] }}</td>
          </tr>
          <tr>
            <td>FEBRERO</td>
            <td>{{ $conyuge['febrero'] }}</td>
            <td>$ {{ $utm['febrero'] }}</td>
            <td>{{ $conyuge['febrero_utm'] }}</td>
          </tr>
          <tr>
            <td>MARZO</td>
            <td>{{ $conyuge['marzo'] }}</td>
            <td>$ {{ $utm['marzo'] }}</td>
            <td>{{ $conyuge['marzo_utm'] }}</td>
          </tr>
          <tr>
            <td>ABRIL</td>
            <td>{{ $conyuge['abril'] }}</td>
            <td>$ {{ $utm['abril'] }}</td>
            <td>{{ $conyuge['abril_utm'] }}</td>
          </tr>
          <tr>
            <td>MAYO</td>
            <td>{{ $conyuge['mayo'] }}</td>
            <td>$ {{ $utm['mayo'] }}</td>
            <td>{{ $conyuge['mayo_utm'] }}</td>
          </tr>
          <tr>
            <td>JUNIO</td>
            <td>{{ $conyuge['junio'] }}</td>
            <td>$ {{ $utm['junio'] }}</td>
            <td>{{ $conyuge['junio_utm'] }}</td>
          </tr>
          <tr>
            <td>JULIO</td>
            <td>{{ $conyuge['julio'] }}</td>
            <td>$ {{$utm['julio'] }}</td>
            <td>{{ $conyuge['julio_utm'] }}</td>
          </tr>
          <tr>
            <td>AGOSTO</td>
            <td>{{ $conyuge['agosto'] }}</td>
            <td>$ {{ $utm['agosto'] }}</td>
            <td>{{ $conyuge['agosto_utm'] }}</td>
          </tr>
          <tr>
            <td>SEPTIEMBRE</td>
            <td>{{ $conyuge['septiembre'] }}</td>
            <td>$ {{ $utm['septiembre'] }}</td>
            <td>{{ $conyuge['septiembre_utm'] }}</td>
          </tr>
          <tr>
            <td>OCTUBRE</td>
            <td>{{ $conyuge['octubre'] }}</td>
            <td>$ {{$utm['octubre'] }}</td>
            <td>{{ $conyuge['octubre_utm'] }}</td>
          </tr>
          <tr>
            <td>NOVIEMBRE</td>
            <td>{{ $conyuge['noviembre'] }}</td>
            <td>$ {{$utm['noviembre'] }}</td>
            <td>{{ $conyuge['noviembre_utm'] }}</td>
          </tr>
          <tr>
            <td>DICIEMBRE</td>
            <td>{{ $conyuge['diciembre'] }}</td>
            <td>$ {{ $utm['diciembre'] }}</td>
            <td>{{ $conyuge['diciembre_utm'] }}</td>
          </tr>
          <tr>
            <td style="border: 0px solid black;"></td>
            <td colspan="2">INGRESOS TOTALES EN UTM</td>
            <td>{{ $declaracion['ingreso_total_conyuge_utm'] }}</td>
          </tr>
        </table>

        <table style="width:48%; height:100%; float: left;">
          <tr>
            <th></th>
            <th colspan="3">INGRESOS DEL DEUDOR AÑO {{ $utm['year'] }}</th>
          </tr>
          <tr>
            <td>MES</td>
            <td>MONTO EN PESOS</td>
            <td>VALOR UTM</td>
            <td>MONTO EN UTM</td>
          </tr>
          <tr>
            <td>ENERO</td>
            <td>{{ $declaracion['enero'] }}</td>
            <td>$ {{ $utm['enero'] }}</td>
            <td>{{ $declaracion['enero_utm'] }}</td>
          </tr>
          <tr>
            <td>FEBRERO</td>
            <td>{{ $declaracion['febrero'] }}</td>
            <td>$ {{ $utm['febrero'] }}</td>
            <td>{{ $declaracion['febrero_utm'] }}</td>
          </tr>
          <tr>
            <td>MARZO</td>
            <td>{{ $declaracion['marzo'] }}</td>
            <td>$ {{ $utm['marzo'] }}</td>
            <td>{{ $declaracion['marzo_utm'] }}</td>
          </tr>
          <tr>
            <td>ABRIL</td>
            <td>{{ $declaracion['abril'] }}</td>
            <td>$ {{ $utm['abril'] }}</td>
            <td>{{ $declaracion['abril_utm'] }}</td>
          </tr>
          <tr>
            <td>MAYO</td>
            <td>{{ $declaracion['mayo'] }}</td>
            <td>$ {{ $utm['mayo'] }}</td>
            <td>{{ $declaracion['mayo_utm'] }}</td>
          </tr>
          <tr>
            <td>JUNIO</td>
            <td>{{ $declaracion['junio'] }}</td>
            <td>$ {{ $utm['junio'] }}</td>
            <td>{{ $declaracion['junio_utm'] }}</td>
          </tr>
          <tr>
            <td>JULIO</td>
            <td>{{ $declaracion['julio'] }}</td>
            <td>$ {{ $utm['julio'] }}</td>
            <td>{{ $declaracion['julio_utm'] }}</td>
          </tr>
          <tr>
            <td>AGOSTO</td>
            <td>{{ $declaracion['agosto'] }}</td>
            <td>$ {{ $utm['agosto'] }}</td>
            <td>{{ $declaracion['agosto_utm'] }}</td>
          </tr>
          <tr>
            <td>SEPTIEMBRE</td>
            <td>{{ $declaracion['septiembre'] }}</td>
            <td>$ {{ $utm['septiembre'] }}</td>
            <td>{{ $declaracion['septiembre_utm'] }}</td>
          </tr>
          <tr>
            <td>OCTUBRE</td>
            <td>{{ $declaracion['octubre'] }}</td>
            <td>$ {{ $utm['octubre'] }}</td>
            <td>{{ $declaracion['octubre_utm'] }}</td>
          </tr>
          <tr>
            <td>NOVIEMBRE</td>
            <td>{{ $declaracion['noviembre'] }}</td>
            <td>$ {{ $utm['noviembre'] }}</td>
            <td>{{ $declaracion['noviembre_utm'] }}</td>
          </tr>
          <tr>
            <td>DICIEMBRE</td>
            <td>{{ $declaracion['diciembre'] }}</td>
            <td>$ {{ $utm['diciembre'] }}</td>
            <td>{{ $declaracion['diciembre_utm'] }}</td>
          </tr>
          <tr>
            <td style="border: 0px solid black;"></td>
            <td colspan="2">INGRESOS TOTALES EN UTM</td>
            <td>{{ $declaracion['ingreso_total_deudor_utm'] }}</td>
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

		th, td {
		  border: 2px solid black;
		  border-collapse: collapse;
		  height: 23px;
      text-align: center;
		}
	</style>

</html>