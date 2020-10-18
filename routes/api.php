<?php

use App\Http\Controllers\GuestsController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::resource('guests', GuestsController::class)->except(['edit', 'create']);
