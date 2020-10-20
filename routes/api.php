<?php

use App\Http\Controllers\VideosController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::resource('videos', VideosController::class)->except(['edit', 'create']);
Route::resource('users', UsersController::class)->except(['edit', 'create']);
Route::post('videos/{video}/play', [VideosController::class, 'play']);

Route::get('authenticate', function() {
    return response(true, auth()->user() ? 200 : 401);
});
