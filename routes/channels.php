<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\Video;

Broadcast::channel('chat', function($user) {
    return ['user' => $user];
});

Broadcast::channel('playlist', function($user) {
    return ['user' => $user, 'videos' => Video::all()];
});

Broadcast::channel('player', function($user) {
    return ['user' => $user];
});
