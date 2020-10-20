import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../states/VideoId';
import YouTube from 'react-youtube';

export default function Player() {
    // const [videoId, setVideoId] = useState('dQw4w9WgXcQ');
    const videoId = useSelector(state => state.videoId);

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
