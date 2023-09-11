<?php

namespace App\Http\Controllers;

use App\Models\Utm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Utilities\RequestUtil;
use Carbon\Carbon;
use Exception;

class UtmController extends Controller
{

    public function registrar_utm(Request $request)
    {
        $data = $request->validate([
            'year' => 'required',
            'enero'=> 'required',
            'febrero'=> 'required',
            'marzo' => 'required',
            'abril' => 'required',
            'mayo' => 'required',
            'junio' => 'required',
            'julio' => 'required',
            'agosto' => 'required',
            'septiembre' => 'required',
            'octubre' => 'required', 
            'noviembre' => 'required',
            'diciembre' => 'required'
        ]);

        DB::table('utm')->insert([
            'year'=> $data['year'],
            'enero' => $data['enero'],
            'febrero' => $data['febrero'],
            'marzo' =>$data['marzo'],
            'abril' => $data['abril'],
            'mayo'=> $data['mayo'],
            'junio' => $data['junio'],
            'julio' => $data['julio'],
            'agosto' => $data['agosto'],
            'septiembre' => $data['septiembre'],
            'octubre' => $data['octubre'],
            'noviembre' => $data['noviembre'],
            'diciembre' => $data['diciembre']
        ]);

        $response = ['mensaje' => 'La utm del año'.$data['year'].'se ha registrado correctamente'];
        return response($response, 200);
    }

    public function registrar_utm_auto(Request $request)
    {
        $data = $request->validate(
            [
                'year' => 'required'
            ]
        );

        try {
            $year = $data['year'];
            $apikey = env('API_CMF');
            $formato = 'json';

            $url ='https://api.cmfchile.cl/api-sbifv3/recursos_api/utm/'.$year.'?apikey='.$apikey.'&formato='.$formato;
            $params = [];
            $header = [];

            $response =  RequestUtil::doRequest('GET', $url, $params, $header);

            $nueva_utm = new Utm();
            $nueva_utm->year = $year;

            foreach ($response->UTMs as $utm) {
                $fecha = new Carbon($utm->Fecha);

                switch($fecha->month){
                case 1:
                    $nueva_utm->enero = str_replace('.', '', $utm->Valor);
                    break;
                case 2:
                    $nueva_utm->febrero = str_replace('.', '', $utm->Valor);
                    break;
                case 3:
                    $nueva_utm->marzo = str_replace('.', '', $utm->Valor);
                    break;
                case 4:
                    $nueva_utm->abril = str_replace('.', '', $utm->Valor);
                    break;
                case 5:
                    $nueva_utm->mayo = str_replace('.', '', $utm->Valor);
                    break;
                case 6:
                    $nueva_utm->junio = str_replace('.', '', $utm->Valor);
                    break;
                case 7:
                    $nueva_utm->julio = str_replace('.', '', $utm->Valor);
                    break;
                case 8:
                    $nueva_utm->agosto = str_replace('.', '', $utm->Valor);
                    break;
                case 9:
                    $nueva_utm->septiembre = str_replace('.', '', $utm->Valor);
                    break;
                case 10:
                    $nueva_utm->octubre = str_replace('.', '', $utm->Valor);
                    break;
                case 11:
                    $nueva_utm->noviembre = str_replace('.', '', $utm->Valor);
                    break;
                case 12:
                    $nueva_utm->diciembre = str_replace('.', '', $utm->Valor);
                    break;
                }
            }

            $nueva_utm->save();
            $response = ['mensaje' => 'La utm del año '.$data['year'].' se ha registrado correctamente'];
            return response($response, 200);
            
        } catch (Exception $e) {
            $response = ['mensaje' => 'Ocurrió un error al intentar registrar la utm'];
            return response($response, 200);
        }
    }

    public function listado_utm()
    {
        $listado_utm = DB::table('utm')->get();

        return response()->json($listado_utm);
    }

    public function datos_utm(Request $request, $year)
    {
        $utm = DB::table('utm')
            ->where('utm.year', $year)->first();

        return response()->json($utm);
    }

    public function actualizar_datos_utm(Request $request, $year)
    {
        $data = $request->validate([
            'year' => 'required',
            'enero'=> 'required',
            'febrero'=> 'required',
            'marzo' => 'required',
            'abril' => 'required',
            'mayo' => 'required',
            'junio' => 'required',
            'julio' => 'required',
            'agosto' => 'required',
            'septiembre' => 'required',
            'octubre' => 'required', 
            'noviembre' => 'required',
            'diciembre' => 'required'
        ]);

        DB::table('utm')
            ->where('utm.year', $year)
            ->update([
            'enero' => $data['enero'],
            'febrero' => $data['febrero'],
            'marzo' =>$data['marzo'],
            'abril' => $data['abril'],
            'mayo'=> $data['mayo'],
            'junio' => $data['junio'],
            'julio' => $data['julio'],
            'agosto' => $data['agosto'],
            'septiembre' => $data['septiembre'],
            'octubre' => $data['octubre'],
            'noviembre' => $data['noviembre'],
            'diciembre' => $data['diciembre']
        ]);

        $response = ['mensaje' => 'Los datos de la utm se han actualizado correctamente'];
        return response($response, 200);
    }
}
