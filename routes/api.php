<?php

use App\Http\Controllers\MessagesController;
use App\Http\Controllers\ColorsController;
use App\Http\Controllers\VideosController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('colors', [ColorsController::class, 'index']);

Route::get('messages/chatmax', [MessagesController::class, 'getChatMax']);
Route::post('messages', [MessagesController::class, 'store']);
Route::get('messages', [MessagesController::class, 'index']);

Route::post('video', [VideosController::class, 'play']);
Route::get('video', [VideosController::class, 'index']);

Route::put('users/{user}/color', [UsersController::class, 'changeColor']);
Route::post('users', [UsersController::class, 'store']);
Route::get('users', [UsersController::class, 'index']);

Route::get('authenticate', function() {
    $user = auth()->user();
    return response($user, $user ? 200 : 401);
});
