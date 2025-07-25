<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\CurriculumController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('cv', [CurriculumController::class, 'index'])->name('curriculum');
Route::prefix('blog')->group(function () {
    Route::get('/', [BlogController::class, 'index'])->name('blog.index');
    Route::get('{slug}', [BlogController::class, 'show'])->name('blog.show');
});

Route::get('login', [LoginController::class, 'show'])->name('login');
Route::post('login', [LoginController::class, 'store']);
Route::delete('logout', LogoutController::class)->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});
