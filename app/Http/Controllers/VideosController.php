<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\PlayVideo;
use App\Models\Video;

class VideosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response(Video::first(['video_id'])->pluck('video_id'));
    }

    public function play(Request $request)
    {
        $video = Video::first();
        $video->update(['video_id' => $request->videoId]);
        broadcast(new PlayVideo($video->video_id));
        return response(true);
    }
}
