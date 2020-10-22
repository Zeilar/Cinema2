<?php

use App\Http\Controllers\MessagesController;
use App\Http\Controllers\VideosController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::post('messages', [MessagesController::class, 'store']);
Route::get('messages', [MessagesController::class, 'index']);

Route::post('video', [VideosController::class, 'play']);
Route::get('video', [VideosController::class, 'index']);

Route::post('users', [UsersController::class, 'store']);
Route::get('users', [UsersController::class, 'index']);

Route::get('test', function () {
    dd(\App\Models\Message::latest()->limit(30)->get());
});

Route::get('authenticate', fn() => response(true, auth()->user() ? 200 : 401));
