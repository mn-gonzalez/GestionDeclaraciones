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
              <table style="padding-left: 25%; width: 44mm; height: 14mm; font-size: 9pt; text-align: center;">
                <tr>
                  <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">RUT DEL DEUDOR</td>
                </tr>
                <tr>
                  <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ $data['declaracion']->rut_deudor }}</td>
                </tr>
              </table>
            </td>
        </tr>
      </table>
		</div>

		<div style="font-size: 9pt; margin-bottom:10px;">
        IDENTIFICACION DEL DEUDOR DE CREDITO UNIVERSITARIO SOLIDARIO
        <div class="nombre">
            <div style="height: 100%; width:32%; float: left; padding-left: 3mm;">
            	<div style="font-size: 9pt;">APELLIDO PATERNO</div>
            	<div style="font-size: 9pt;">{{ $data['declaracion']->ap_paterno }}</div>
            </div>
            <div style="height: 100%; width:32%; float: left; padding-left: 3mm;">
            	<div style="font-size: 9pt;">APELLIDO MATERNO</div>
            	<div style="font-size: 9pt;">{{ $data['declaracion']->ap_materno }}</div>
            </div>
            <div style="height: 100%; width:32%; float: left; padding-left: 3mm;">
            	<div style="font-size: 9pt;">NOMBRES</div>
            	<div style="font-size: 9pt;">{{ $data['declaracion']->nombres }}</div>
            </div>
        </div>
    </div>

    <div class="seccion-direccion">
        <div class="nombre">
        	<div style="height: 100%; width:45%; float: left; padding-left: 3mm;">
            	<div style="font-size: 9pt;">DIRECCIÓN</div>
            	<div style="font-size: 9pt;">{{ $data['declaracion']->direccion }}</div>
            </div>
            <div style="height: 100%; width:15%; float: left; padding-left: 3mm;">
            	<div style="font-size: 9pt;">COMUNA</div>
            	<div style="font-size: 9pt;">{{ $data['declaracion']->comuna }}</div>
            </div>
            <div style="height: 100%; width:15%; float: left; padding-left: 3mm;">
            	<div style="font-size: 9pt;">CIUDAD</div>
            	<div style="font-size: 9pt;">{{ $data['declaracion']->ciudad }}</div>
            </div>
            <div style="height: 100%; width:15%; float: left; padding-left: 3mm;">
            	<div style="font-size: 9pt;">TELÉFONO</div>
            	<div style="font-size: 9pt;">{{ $data['declaracion']->telefono }}</div>
            </div>
        </div>
    </div>

    <div class="seccion-trabajo">
        <div class="estado-civil">
            <span style="float: left; font-size:9pt; width: 15%;">ESTADO CIVIL</span>
            <div class="valor-estado-civil">
            	<div style="text-align: center; font-size: large;">{{ $data['declaracion']->estado_civil }}</div>
            </div>
            <div class="opciones-estado">
                <div style="font-size: 9pt;">1. SOLTERO SIN HIJOS</div>
                <div style="font-size: 9pt;">2. SOLTERO CON HIJOS</div>
                <div style="font-size: 9pt;">3. CASADO</div>
                <div style="font-size: 9pt;">4. CASADO CON DEUDOR REPROG. CRED. UNIV. O FISCAL .........................</div>
            </div>
        </div>

        <div class="trabajo">
            <div style="float: left; height:100%; width: 33%;">
            	<div style="font-size: 9pt;">INSTITUCIÓN EN LA QUE TRABAJA</div>
            	<div style="padding-top: 1mm; font-size: 9pt;">{{ $data['declaracion']->trabajo }}</div>
            </div>
            <div style="float: left; height:100%; width: 25%;">
            	<div style="font-size: 9pt;">TELÉFONO DEL TRABAJO</div>
            	<div style="padding-top: 1mm; font-size: 9pt;">{{ $data['declaracion']->tel_trabajo }}</div>
            </div>
            <div style="float: left; height:100%; width: 33%;">
                <div style="font-size: 9pt;">PRESENTA DECLARACIÓN DE RENTA S.I.I</div>
                <div style="padding-top: 1mm; font-size: 9pt;">SI........    NO........</div>
            </div>
        </div>
    </div>

    <div class="seccion-afp">
        <div class="nombre">
        	<div style="height: 100%; width:33%; float: left; padding-left: 3mm;">
            	<div style="font-size: 9pt;">AFP DE LA QUE ES AFILIADO</div>
            	<div style="font-size: 9pt;">{{ $data['declaracion']->afp }}</div>
            </div>
            <div style="height: 100%; width:33%; float: left;">
            	<div style="font-size: 9pt;">CORREO ELECTRÓNICO DEUDOR</div>
            	<div style="font-size: 9pt;">{{ $data['declaracion']->correo }}</div>
            </div>
            <div style="height: 100%; width:33%; float: left;">
            	<div style="font-size: 9pt;">DESEA INFORMACIÓN AL CORREO ELECTRÓNICO</div>
            	<div style="font-size: 9pt;">NO</div>
            </div>
        </div>
    </div>

    <div class="seccion-conyuge">
        <div class="rut-conyuge" style="padding-left: 3mm; font-size: 9pt;">RUT DEL CONYUGE N° {{ $data['conyuge']->rut }}</div>
        <div class="nombre-conyuge">
        	<div style="height: 100%; width:32%; float: left; padding-left: 3mm;">
            	<div style="font-size: 9pt;">APELLIDO PATERNO</div>
            	<div style="font-size: 9pt;">{{ $data['conyuge']->ap_paterno }}</div>
            </div>
            <div style="height: 100%; width:32%; float: left;">
            	<div style="font-size: 9pt;">APELLIDO MATERNO</div>
            	<div style="font-size: 9pt;">{{ $data['conyuge']->ap_materno }}</div>
            </div>
            <div style="height: 100%; width:32%; float: left;">
            	<div style="font-size: 9pt;">NOMBRES</div>
            	<div style="font-size: 9pt;">{{ $data['conyuge']->nombres }}</div>
            </div>
        </div>
    </div>

    <div style="width: 100%; font-size: 8pt; height: 400px;">
      <table style="width: 100%;">
        <tr>
          <td colspan="1" style="width: 48%;">
            <table style="width:100%; height:100%;">
              <tr>
                <th style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;"></th>
                <th style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;" colspan="3">INGRESOS DEL DEUDOR AÑO {{ $data['utm']->year }}</th>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">MES</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">MONTO EN PESOS</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">VALOR UTM</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">MONTO EN UTM</td>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">ENERO</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->enero, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">$ {{number_format($data['utm']->enero, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->enero_utm, 2, ",", ".") }}</td>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">FEBRERO</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->febrero, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">$ {{ number_format($data['utm']->febrero, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->febrero_utm, 2, ",", ".") }}</td>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">MARZO</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->marzo, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">$ {{ number_format($data['utm']->marzo, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->marzo_utm, 2, ",", ".") }}</td>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">ABRIL</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->abril, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">$ {{ number_format($data['utm']->abril, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->abril_utm, 2, ",", ".") }}</td>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">MAYO</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->mayo, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">$ {{ number_format($data['utm']->mayo, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->mayo_utm, 2, ",", ".") }}</td>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">JUNIO</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->junio, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">$ {{ number_format($data['utm']->junio, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->junio_utm, 2, ",", ".") }}</td>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">JULIO</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->julio, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">$ {{ number_format($data['utm']->julio, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->julio_utm, 0, ",", ".") }}</td>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">AGOSTO</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->agosto, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">$ {{ number_format($data['utm']->agosto, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->agosto_utm, 2, ",", ".") }}</td>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">SEPTIEMBRE</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->septiembre, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">$ {{ number_format($data['utm']->septiembre, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->septiembre_utm, 2, ",", ".") }}</td>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">OCTUBRE</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->octubre, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">$ {{ number_format($data['utm']->octubre, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->octubre_utm, 2, ",", ".") }}</td>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">NOVIEMBRE</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->noviembre, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">$ {{ number_format($data['utm']->noviembre, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->noviembre_utm, 2, ",", ".") }}</td>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">DICIEMBRE</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->diciembre, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">$ {{ number_format($data['utm']->diciembre, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->diciembre_utm, 2, ",", ".") }}</td>
              </tr>
              <tr>
                <td style="border: 0px solid black;"></td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;" colspan="2"><b>INGRESOS TOTALES EN UTM</b></td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->ingreso_total_deudor_utm, 2, ",", ".") }}</td>
              </tr>
            </table>
          </td>
          <td colspan="1" style="width: 4%;">

          </td>
          <td colspan="1" style="width: 48%;">
            <table style="width:100%; height:100%; float:right;">
              <tr>
                <th style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;"></th>
                <th style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;" colspan="3">INGRESOS DEL CONYUGE AÑO {{ $data['utm']->year }}</th>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">MES</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">MONTO EN PESOS</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">VALOR UTM</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">MONTO EN UTM</td>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">ENERO</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['conyuge']->enero, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">$ {{ number_format($data['utm']->enero, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['conyuge']->enero_utm, 2, ",", ".") }}</td>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">FEBRERO</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['conyuge']->febrero, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">$ {{number_format($data['utm']->febrero, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['conyuge']->febrero_utm, 2, ",", ".") }}</td>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">MARZO</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['conyuge']->marzo, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">$ {{ number_format($data['utm']->marzo, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['conyuge']->marzo_utm, 2, ",", ".") }}</td>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">ABRIL</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['conyuge']->abril, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">$ {{ number_format($data['utm']->abril, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['conyuge']->abril_utm, 2, ",", ".") }}</td>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">MAYO</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['conyuge']->mayo, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">$ {{ number_format($data['utm']->mayo, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['conyuge']->mayo_utm, 2, ",", ".") }}</td>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">JUNIO</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['conyuge']->junio, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">$ {{ number_format($data['utm']->junio , 0, ",", ".")}}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['conyuge']->junio_utm, 2, ",", ".") }}</td>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">JULIO</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['conyuge']->julio, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">$ {{ number_format($data['utm']->julio, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['conyuge']->julio_utm, 2, ",", ".") }}</td>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">AGOSTO</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['conyuge']->agosto, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">$ {{ number_format($data['utm']->agosto, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['conyuge']->agosto_utm, 2, ",", ".") }}</td>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">SEPTIEMBRE</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['conyuge']->septiembre, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">$ {{ number_format($data['utm']->septiembre, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['conyuge']->septiembre_utm, 2, ",", ".") }}</td>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">OCTUBRE</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['conyuge']->octubre, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">$ {{ number_format($data['utm']->octubre, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['conyuge']->octubre_utm, 2, ",", ".") }}</td>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">NOVIEMBRE</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['conyuge']->noviembre, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">$ {{ number_format($data['utm']->noviembre, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['conyuge']->noviembre_utm, 2, ",", ".") }}</td>
              </tr>
              <tr>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">DICIEMBRE</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['conyuge']->diciembre, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">$ {{ number_format($data['utm']->diciembre, 0, ",", ".") }}</td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['conyuge']->diciembre_utm, 2, ",", ".") }}</td>
              </tr>
              <tr>
                <td style="border: 0px solid black;"></td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;" colspan="2"><b>INGRESOS TOTALES EN UTM</b></td>
                <td style="border: 2px solid black; border-collapse: collapse; height: 23px; text-align: center;">{{ number_format($data['declaracion']->ingreso_total_conyuge_utm, 2, ",", ".") }}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>

    <div style="text-align: justify; text-justify: inter-word; font-size: 7.5pt; padding-top: 20px;">
        <p>DECLARO BAJO JURAMENTO QUE TODOS LOS DATOS PROPORCIONADOS SON FIDEDIGNOS, ASIMISMO AUTORIZO AL FONDO SOLIDARIO DE CREDITO UNIVERSITARIO, VERIFICAR MIS REMUNERACIONES O RENTA SOBRE LOS CUALES EFECTUO MIS COTIZACIONES PREVISIONALES, PUDIENDO SOLICITAR A LA ADMINISTRADORA DE FONDOS DE PENSIONES.</p>

        <p>NOTA: CUALQUIER ERROR EN ESTE FORMULARIO, SERA RESPONSABILIDAD EXCLUSIVA DEL DEUDOR. NO SE ACEPTAN DECLARACIONES JURADAS FUERA DE PLAZO.<br>
            - LAS INSTRUCCIONES SE ENCUENTRAN AL REVERSO DE ESTE FORMULARIO.<br>
            - RECUERDE EL DEJAR UNA COPIA DE SU DECLARACION EN SU PODER.<br>
            - PUEDE DESCARGAR EL FORMULARIO EN EL LINK: HTTP://INET.UTALCA.CL/CREDITO/ <br></p>
        <br>
        <p>FECHA______________________________________</p>
        <br>
        <br>
    </div>

    <div style="font-size: 8pt; padding-top: 30px;">
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
	</style>

</html>