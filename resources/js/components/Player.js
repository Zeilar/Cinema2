import React, { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';

export default function Player() {
    const [videoId, setVideoId] = useState();

    const options = {
        height: '100%',
        width: '100%',
    };

    useEffect(() => {
        window.Echo.join('player')
            .listen('PlayVideo', ({ videoId }) => {
                console.log(videoId);
            });
    });

    return (
        <div className="player w-75 center-children">
            <YouTube videoId={videoId} containerClassName="playerContainer" opts={options} />
        </div>
    );
}
