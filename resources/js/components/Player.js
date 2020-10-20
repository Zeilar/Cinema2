import React, { useState, useRef, useEffect, useContext } from 'react';
import { VideoIdContext } from '../states/VideoId';
import YouTube from 'react-youtube';

export default function Player() {
    const [videoId, setVideoId] = useContext(VideoIdContext);

    const options = {
        height: '100%',
        width: '100%',
    };

    return (
        <div className="player w-50 center-children">
            <YouTube videoId={videoId} containerClassName="playerContainer" opts={options} />
        </div>
    );
}
