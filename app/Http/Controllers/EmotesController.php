<?php

namespace App\Http\Controllers;

use App\Models\Emote;
use Illuminate\Http\Request;

class EmotesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(Emote::all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Emote  $emote
     * @return \Illuminate\Http\Response
     */
    public function show(Emote $emote)
    {
        //
    }
}
