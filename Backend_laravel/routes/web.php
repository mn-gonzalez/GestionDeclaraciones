<?php

use App\Mail\CorreoDeclaracion;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('declaracion');
});

Route::get('/pdf', function () {
    return view('welcome');
});

Route::get('/correo', function() {
    $name = "Manuel González";

    // The email sending is done using the to method on the Mail facade
    Mail::to('mn_gonzalez_16@hotmail.com')->send(new CorreoDeclaracion($name));
});
