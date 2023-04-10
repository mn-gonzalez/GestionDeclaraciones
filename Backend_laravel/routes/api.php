<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DeudorController;
use App\Http\Controllers\FuncionarioController;
use App\Http\Controllers\DeclaracionController;
use App\Http\Controllers\ConyugeController;
use App\Http\Controllers\AuthController;

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

//Registro de usuarios
Route::post('/registrar_deudor', [DeudorController::class, 'registrar']);
Route::post('/registrar_funcionario', [FuncionarioController::class, 'registrar']);

//Inicio de sesion
Route::post('/login_deudor', [AuthController::class, 'login_deudor']);
Route::post('/login_funcionario', [AuthController::class, 'login_funcionario']);

//Declaraciones deudor
Route::post('{rut_deudor}/declaracion/registrar', [DeclaracionController::class, 'registrar']);
Route::put('{rut_deudor}/{id_declaracion}/actualizarDatos', [DeclaracionController::class, 'actualizar_datos_personales']);

Route::put('{rut_deudor}/declaraciones/{id_declaracion}/actualizarIngresos', [DeclaracionController::class, 'actualizar_ingresos']);
Route::get('{rut_deudor}/declaraciones',[DeclaracionController::class, 'declaraciones']);
Route::get('{rut_deudor}/declaraciones/{id_declaracion}',[DeclaracionController::class, 'datos_declaracion']);

//conyuge
Route::post('{rut_deudor}/declaraciones/{id_declaracion}/registrarConyuge',[ConyugeController::class, 'registrar_conyuge']);
Route::get('{rut_deudor}/declaraciones/{id_declaracion}/obtenerConyuge',[ConyugeController::class, 'obtener_conyuge']);

//Datos deudor
Route::get('deudor/{rut_deudor}',[DeudorController::class, 'obtener_datos']);