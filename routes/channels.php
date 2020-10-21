<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\Video;

Broadcast::channel('chat', function($user) {
    return ['user' => $user];
});

Broadcast::channel('player', function($user) {
    return ['user' => $user, 'videoId' => Video::first()->video_id];
});
