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

    public function play(string $videoId)
    {
        $video = Video::first()->update(['video_id' => $videoId]);
        broadcast(new PlayVideo($video->video_id));
        return response(true);
    }
}
