<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Color;
use App\Models\User;
use Auth;

class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(User::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($user = User::where('username', $request->username)->first()) {
            Auth::loginUsingId($user->id);
            return response(['user' => $user]);
        }

        $request->validate([
            'username' => 'required|max:15|string|unique:users',
        ]);

        $user = User::create(['username' => $request->username, 'color_id' => Color::inRandomOrder()->limit(1)->first()->id]);

        Auth::loginUsingId($user->id);

        return response(['user' => $user]);
    }

    public function changeColor(Request $request, User $user) {
        $user->update(['color_id' => json_decode($request->getContent())]);
        return response(true);
    }
}
