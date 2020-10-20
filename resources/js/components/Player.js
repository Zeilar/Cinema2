import React, { useState, useRef, useEffect, useContext } from 'react';
import { VideoIdContext } from '../states/VideoId';
import { VideosContext } from '../states/Videos';
import { deleteVideo } from '../functions';
import YouTube from 'react-youtube';

export default function Player() {
    const [videoId, setVideoId] = useContext(VideoIdContext);
    const [videos, setVideos] = useContext(VideosContext);

    const options = {
        height: '100%',
        width: '100%',
    };

    useEffect(() => {
        window.Echo.join('player')
            .listen('PlayVideo', ({ videoId }) => {
                deleteVideo(videoId, setVideos);
                setVideoId(videoId);
            });
    }, [setVideos, setVideoId]);

    return (
        <div className="player w-50 center-children">
            <YouTube videoId={videoId} containerClassName="playerContainer" opts={options} />
        </div>
    );
}
