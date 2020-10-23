<?php

namespace App\Http\Controllers;

use App\Http\Middleware\LoggedIn;
use Illuminate\Http\Request;
use App\Events\NewMessage;
use App\Models\Message;

class MessagesController extends Controller
{
    public function __construct() {
        $this->middleware(LoggedIn::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(Message::latest()->limit(Message::$CHAT_MAX)->get()->reverse()->flatten());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $message = Message::create(['user_id' => auth()->user()->id, 'content' => $request->content]);
        broadcast(new NewMessage($message));
        return response(true);
    }
}
