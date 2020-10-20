<?php

use App\Http\Controllers\VideosController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::resource('users', UsersController::class)->except(['edit', 'create', 'destroy', 'update']);
Route::post('videos/{video}', [VideosController::class, 'play']);
Route::get('videos', [VideosController::class, 'index']);

Route::get('authenticate', function() {
    return response(true, auth()->user() ? 200 : 401);
});
