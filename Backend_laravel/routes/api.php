<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DeudorController;
use App\Http\Controllers\FuncionarioController;
use App\Http\Controllers\DeclaracionController;
use App\Http\Controllers\ConyugeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DocumentoController;
use App\Http\Controllers\RevisionController;
use App\Http\Controllers\DevolucionController;
use App\Http\Controllers\PostergacionController;
use App\Http\Controllers\UtmController;
use App\Http\Controllers\ReportesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['middleware' => ['api']], function () {
    Route::post('/login_deudor', [AuthController::class, 'login_deudor']);
    Route::post('/login_funcionario', [AuthController::class, 'login_funcionario']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/registrar_deudor', [DeudorController::class, 'registrar']);
    Route::post('/registrar_funcionario', [FuncionarioController::class, 'registrar']);
});

Route::group(['middleware' => ['api']], function () {

    /*
        Api accesible para funcionarios
    */
    Route::get('/test', [DeudorController::class, 'test']);

    //Registro de usuarios
    Route::get('/deudores', [DeudorController::class, 'listado_deudores']);
    Route::get('/funcionarios', [FuncionarioController::class, 'listado_funcionarios']);

    //declaraciones sin revisar
    Route::get('/declaraciones/estado/{estado}', [DeclaracionController::class, 'obtenerDeclaracionesSegunEstado']);

    //listado de declaraciones que estan siendo revisadas por un funcionario
    Route::get('/declaraciones/enRevision/{rut_funcionario}', [DeclaracionController::class, 'obtenerDeclaracionesEnRevision']);

    //informacion de utm
    Route::post('/utm/registrar', [UtmController::class, 'registrar_utm']);
    Route::get('/utm', [UtmController::class, 'listado_utm']);
    Route::put('/utm/{year}/actualizar', [UtmController::class, 'actualizar_datos_utm']);
    Route::get('/utm/{year}', [UtmController::class, 'datos_utm']);
    Route::post('/utm/auto-registrar', [UtmController::class, 'registrar_utm_auto']);


    /*
        Api accesible a los deudores
    */

    //Declaraciones deudor
    Route::post('{rut_deudor}/declaraciones/registrar', [DeclaracionController::class, 'registrar']);
    Route::put('{rut_deudor}/declaraciones/{id_declaracion}/actualizarDatos', [DeclaracionController::class, 'actualizar_datos_personales']);
    Route::put('{rut_deudor}/declaraciones/{id_declaracion}/actualizarIngresos', [DeclaracionController::class, 'actualizar_ingresos']);

    //Retorna el id y el estado de una declaracion segun su deudor y el año.
    Route::get('{rut_deudor}/declaraciones/{year}/estado', [DeclaracionController::class, 'obtenerEstadoDeclaracion']);


    //conyuge
    Route::post('{rut_deudor}/declaraciones/{id_declaracion}/registrarConyuge', [ConyugeController::class, 'registrar_conyuge']);
    Route::put('{rut_deudor}/declaraciones/{id_declaracion}/actualizarConyuge', [ConyugeController::class, 'actualizar_conyuge']);
    Route::get('{rut_deudor}/declaraciones/{id_declaracion}/obtenerConyuge', [ConyugeController::class, 'obtener_conyuge']);

    Route::post('{rut_deudor}/declaraciones/{id_declaracion}/documentacion/subir', [DocumentoController::class, 'registrar_documento_declaracion']);

    /*
        Api accessible a ambos
    */

    Route::get('{rut_deudor}/declaraciones', [DeclaracionController::class, 'declaraciones']);
    Route::get('{rut_deudor}/declaraciones/{id_declaracion}', [DeclaracionController::class, 'datos_declaracion']);
    Route::put('{rut_deudor}/declaraciones/{id_declaracion}/actualizarEstado', [DeclaracionController::class, 'actualizar_estado']);


    //documentacion de declaracion
    Route::get('{rut_deudor}/declaraciones/{id_declaracion}/documentacion', [DocumentoController::class, 'obtener_listado_documentos_declaracion']);
    Route::get('{rut_deudor}/declaraciones/{id_declaracion}/documentacion/{id_documento}', [DocumentoController::class, 'obtener_documento']);
    Route::get('storage/{id_declaracion}/documento/{tipo_documento}', [DocumentoController::class, 'obtener_url_documento']);

    //obtiene el formulario firmado ante notario que subio el deudor
    Route::get('{rut_deudor}/declaraciones/{id_declaracion}/DECLARACION_FIRMADA', [DocumentoController::class, 'obtener_archivo_declaracion_firmada']);

    //Datos deudor
    Route::get('deudor/{rut_deudor}', [DeudorController::class, 'obtener_datos']);
    Route::get('deudor/{rut_deudor}/informacion', [DeudorController::class, 'obtener_datos_completos']);
    Route::put('deudor/{rut_deudor}/actualizarDatos', [DeudorController::class, 'actualizar_datos']);

    //generar pdf de una declaracion
    Route::get('{rut_deudor}/declaraciones/{id_declaracion}/generarPdf', [DeclaracionController::class, 'generarPdfDeclaracion']);

    //verificar si el pdf de un declaracion ya se generó
    Route::get('{rut_deudor}/declaraciones/{id_declaracion}/formularioPDF', [DeclaracionController::class, 'verificarDisponibilidadPdf']);

    //revisiones
    Route::post('revisiones/registrar', [RevisionController::class, 'registrar_revision']);
    Route::get('revisiones/{id_declaracion}', [RevisionController::class, 'obtener_revisiones_declaracion']);
    Route::get('solicitudes/{id_solicitud}/revision', [RevisionController::class, 'obtener_revision_solicitudes']);
    Route::put('revisiones/actualizar/{id_revision}', [RevisionController::class, 'actualizar_revision']);
    Route::put('{rut_deudor}/solicitudes/{id_solicitud}/actualizarEstado', [DeclaracionController::class, 'actualizar_estado']);
    Route::get('{rut_funcionario}/revisiones/{id_declaracion}', [RevisionController::class, 'obtener_revision_por_funcionario']);

    //devoluciones
    Route::post('{rut_deudor}/devoluciones/registrar', [DevolucionController::class, 'registrar_devolucion']);
    Route::get('{rut_deudor}/devoluciones', [DevolucionController::class, 'obtener_devoluciones']);
    Route::get('devoluciones/sinRevisar', [DevolucionController::class, 'obtener_devoluciones_sin_revisar']);
    Route::get('devoluciones/{id_devolucion}', [DevolucionController::class, 'obtener_datos_devolucion']);
    Route::get('devoluciones/revisadas/{rut_funcionario}', [DevolucionController::class, 'obtener_devoluciones_revisadas']);

    //postergaciones
    Route::middleware('auth:sanctum')->post('{rut_deudor}/postergaciones/registrar', [PostergacionController::class, 'registrar_postergacion']);
    Route::get('{rut_deudor}/postergaciones', [PostergacionController::class, 'obtener_postergaciones_deudor']);
    Route::get('postergaciones/sinRevisar', [PostergacionController::class, 'postergaciones_sin_revisar']);
    Route::get('postergaciones/{id_postergacion}', [PostergacionController::class, 'datos_postergacion']);
    Route::get('postergaciones/revisadas/{rut_funcionario}', [PostergacionController::class, 'postergaciones_revisadas']);

    //Reportes
    Route::get('reportes/deudores/declaraciones/sinEntregar/{year}', [ReportesController::class, 'deudores_con_declaraciones_sin_entregar']);
    Route::get('reportes/deudores/declaraciones/finalizadas/{year}', [ReportesController::class, 'deudores_con_declaraciones_entregadas']);
    Route::get('reportes/deudores/declaraciones/conErrores/{year}', [ReportesController::class, 'deudores_con_declaraciones_con_problemas']);
    Route::get('reportes/deudores/conPostergacion/{year}', [ReportesController::class, 'deudores_con_postergacion']);
});
