<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\CurriculumController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('cv', [CurriculumController::class, 'index'])->name('curriculum');
Route::prefix('blog')->group(function () {
    Route::get('/', [BlogController::class, 'index'])->name('blog.index');
    Route::get('{slug}', [BlogController::class, 'show'])->name('blog.show');
});
