<?php

use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::resource('users', UsersController::class)->except(['edit', 'create']);
Route::get('authenticate', function() {
    return response(true, auth()->user() ? 200 : 401);
});
