<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DeudorController;
use App\Http\Controllers\FuncionarioController;
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

Route::post('/registrar_deudor', [DeudorController::class, 'registrar']);
Route::post('/registrar_funcionario', [FuncionarioController::class, 'registrar']);
Route::post('/login_deudor', [AuthController::class, 'login_deudor']);
Route::post('/login_funcionario', [AuthController::class, 'login_funcionario']);