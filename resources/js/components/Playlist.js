import Echo from 'laravel-echo';
import React, { useState, useRef, useEffect } from 'react';

export default function Playlist() {
    console.log(window.Echo.join);
    window.Echo.join('playlist')
        .here(data => console.log(data));

    return (
        <div className="playlist rounded">
            Playlist
        </div>
    );
}