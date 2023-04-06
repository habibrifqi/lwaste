<?php

use App\Http\Middleware\Admin;
use App\Http\Controllers\SessionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

route::get('/', [SessionController::class, 'index']);
route::POST('/sesi/login', [SessionController::class, 'login']);
route::get('/logout', [SessionController::class, 'logout'])->name('logout');

Route::group(['middleware' => 'admin'], function () {
    Route::get('/home', function () {
        return view('home');
    })->name('home');

    Route::get('/kt', function () {
        return 'kt';
    })->name('kt');
});