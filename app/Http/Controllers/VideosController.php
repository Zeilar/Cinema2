<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\AddVideo;
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
        return response(Video::all(['video_id'])->pluck('video_id'));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (Video::where('video_id', $request->videoId)->first()) {
            return response(['message' => 'That video already exists in the playlist.'], 422);
        }

        $video = Video::create(['video_id' => $request->videoId]);
        broadcast(new AddVideo($video->video_id));

        return response(true, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function show(Video $video)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Video  $video
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Video $video)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\string  $videoId
     * @return \Illuminate\Http\Response
     */
    public function destroy(string $videoId)
    {
        if (!$video = Video::where('video_id', $videoId)->first()) {
            return abort(404);
        }
        
        $videoId = $video->video_id;
        $video->delete();

        return response(['videoId' => $videoId]);
    }

    public function play(string $videoId)
    {
        dd($videoId);
    }
}
