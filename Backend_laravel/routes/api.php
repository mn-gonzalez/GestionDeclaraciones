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

//Inicio de sesion
Route::post('/login_deudor', [AuthController::class, 'login_deudor']);
Route::post('/login_funcionario', [AuthController::class, 'login_funcionario']);

/*
    Api accesible para funcionarios
*/

//Registro de usuarios
Route::post('/registrar_deudor', [DeudorController::class, 'registrar']);
Route::post('/registrar_funcionario', [FuncionarioController::class, 'registrar']);

Route::get('/deudores',[DeudorController::class, 'listado_deudores']);
Route::get('/funcionarios',[FuncionarioController::class, 'listado_funcionarios']);

//declaraciones sin revisar
Route::get('/declaraciones/sinRevisar', [DeclaracionController::class, 'declaracionesSinRevisar']);

//informacion de utm
Route::post('/utm/registrar', [UtmController::class, 'registrar_utm']);
Route::get('/utm', [UtmController::class, 'listado_utm']);
Route::put('/utm/{year}/actualizar', [UtmController::class, 'actualizar_datos_utm']);


/*
    Api accesible a los deudores
*/

//Declaraciones deudor
Route::post('{rut_deudor}/declaraciones/registrar', [DeclaracionController::class, 'registrar']);
Route::put('{rut_deudor}/declaraciones/{id_declaracion}/actualizarDatos', [DeclaracionController::class, 'actualizar_datos_personales']);

Route::put('{rut_deudor}/declaraciones/{id_declaracion}/actualizarIngresos', [DeclaracionController::class, 'actualizar_ingresos']);

//conyuge
Route::post('{rut_deudor}/declaraciones/{id_declaracion}/registrarConyuge',[ConyugeController::class, 'registrar_conyuge']);
Route::get('{rut_deudor}/declaraciones/{id_declaracion}/obtenerConyuge',[ConyugeController::class, 'obtener_conyuge']);

Route::post('{rut_deudor}/declaraciones/{id_declaracion}/documentacion/subir',[DocumentoController::class, 'registrar_documento_declaracion']);

/*
    Api accessible a ambos
*/

Route::get('{rut_deudor}/declaraciones',[DeclaracionController::class, 'declaraciones']);
Route::get('{rut_deudor}/declaraciones/{id_declaracion}',[DeclaracionController::class, 'datos_declaracion']);
Route::put('{rut_deudor}/declaraciones/{id_declaracion}/actualizarEstado', [DeclaracionController::class, 'actualizar_estado']);


//documentacion de declaracion
Route::get('{rut_deudor}/declaraciones/{id_declaracion}/documentacion',[DocumentoController::class, 'obtener_listado_documentos_declaracion']);
Route::get('{rut_deudor}/declaraciones/{id_declaracion}/documentacion/{id_documento}',[DocumentoController::class, 'obtener_documento']);
Route::get('storage/{id_declaracion}/documento/{tipo_documento}',[DocumentoController::class, 'obtener_url_documento']);

//Datos deudor
Route::get('deudor/{rut_deudor}',[DeudorController::class, 'obtener_datos']);

//generar pdf de una declaracion
Route::get('{rut_deudor}/declaraciones/{id_declaracion}/generarPdf', [DeclaracionController::class, 'generarPdfDeclaracion']);

//revisiones
Route::post('revisiones/registrar',[RevisionController::class, 'registrar_revision']);
Route::get('revisiones/{id_declaracion}',[RevisionController::class, 'obtener_revisiones']);

//devoluciones
Route::post('{rut_deudor}/devoluciones/registrar',[DevolucionController::class, 'registrar_devolucion']);
Route::get('{rut_deudor}/devoluciones',[DevolucionController::class, 'obtener_devoluciones']);
Route::get('devoluciones/sinRevisar',[DevolucionController::class, 'obtener_devoluciones_sin_revisar']);
Route::get('devoluciones/{id_devolucion}',[DevolucionController::class, 'obtener_datos_devolucion']);

//postergaciones
Route::post('{rut_deudor}/postergaciones/registrar',[PostergacionController::class, 'registrar_postergacion']);
Route::get('{rut_deudor}/postergaciones',[PostergacionController::class, 'obtener_postergaciones_deudor']);
Route::get('postergaciones/sinRevisar',[PostergacionController::class, 'postergaciones_sin_revisar']);