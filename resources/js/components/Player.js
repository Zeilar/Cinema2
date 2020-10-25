import { mdiPlay, mdiPause, mdiSkipBackward, mdiSkipNext, mdiSkipPrevious, mdiSync } from '@mdi/js';
import React, { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import Http from '../classes/Http';
import Icon from '@mdi/react';

export default function Player() {
    const [videoId, setVideoId] = useState();
    const [channel, setChannel] = useState();
    const [input, setInput] = useState('');
    const youtube = useRef();

    const options = {
        height: '100%',
        width: '100%',
    };

    async function getVideoId() {
        const response = await Http.get('video');
        setVideoId(response.videoId);
    }

    async function playVideo(e) {
        e.preventDefault();

        if (input === '') return alert('sdfnsfd');

        let url = '';
        try {
            url = new URL(input);
        } catch (e) {
            return alert('Invalid URL, please try again\n\nAnd make sure it contains "v=" anywhere');
        }
        const parameters = new URLSearchParams(url.search);
        const videoId = parameters.get('v');

        if (!videoId) return alert('Invalid URL, please try again\n\nAnd make sure it contains "v=" anywhere');

        const formData = new FormData();
        formData.append('videoId', videoId);

        await Http.post('video', { body: formData });

        setInput('');
    }

    async function play(whisperToOthers = true) {
        youtube.current.internalPlayer.playVideo();
        if (whisperToOthers) channel?.whisper('play', { play: true });
    }

    async function pause(whisperToOthers = true) {
        youtube.current.internalPlayer.pauseVideo();
        if (whisperToOthers) channel?.whisper('pause', { pause: true });
    }

    async function skip(direction = 'forward', whisperToOthers = true, seconds = 15) {
        const current = await youtube.current.internalPlayer.getCurrentTime() ?? 0;
        const skipTo = () => {
            switch (direction) {
                case 'forward':
                    return current + seconds;
                case 'backward':
                    return current - seconds;
                default:
                    return current;
            }
        }
        youtube.current.internalPlayer.seekTo(skipTo());
        if (whisperToOthers) channel?.whisper('skip', { direction: direction });
    }

    async function sync(timestamp = 0, whisperToOthers = true) {
        if (whisperToOthers) {
            const current = await youtube.current.internalPlayer.getCurrentTime() ?? 0;
            channel?.whisper('sync', { timestamp: current });
        } else {
            youtube.current.internalPlayer.seekTo(timestamp);
        }
    }

    async function restart(whisperToOthers = true) {
        youtube.current.internalPlayer.seekTo(0);
        if (whisperToOthers) channel?.whisper('restart', { restart: true });
    }

    useEffect(() => {
        const channel = window.Echo.join('player')
            .here(data => {
                if (videoId === data[0].videoId) return;
            })
            .listen('PlayVideo', ({ videoId }) => setVideoId(videoId))
            .listenForWhisper('skip', e => skip(e.direction, false))
            .listenForWhisper('pause', () => pause(false))
            .listenForWhisper('play', () => play(false))
            .listenForWhisper('sync', e => sync(e.timestamp, false))
            .listenForWhisper('restart', () => restart(false));
        setChannel(channel);
        getVideoId();
    }, []);

    return (
        <div className="player w-75 col">
            <form className="playerInputWrapper row mt-2 mb-2 center-children" onSubmit={playVideo}>
                <h1 className="playerInputHeader mr-2">
                    Suggest a video
                </h1>
                <input
                    className="playerInput" placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    onChange={(e) => setInput(e.target.value)} value={input}
                />
            </form>

            <YouTube ref={youtube} videoId={videoId} containerClassName="playerContainer" opts={options} />

            <div className="playerControls row mt-2 mb-2 center-children">
                <button className="btn" title="Restart" onClick={() => restart()}>
                    <Icon path={mdiSkipBackward} />
                </button>
                <button className="btn" title="Skip backward 15 seconds" onClick={() => skip('backward')}>
                    <Icon path={mdiSkipPrevious} />
                </button>
                <button className="btn" title="Play" onClick={() => play()}>
                    <Icon path={mdiPlay} />
                </button>
                <button className="btn" title="Pause" onClick={() => pause()}>
                    <Icon path={mdiPause} />
                </button>
                <button className="btn" title="Skip forward 15 seconds" onClick={() => skip('forward')}>
                    <Icon path={mdiSkipNext} />
                </button>
                <button className="btn" title="Sync with party" onClick={() => sync()}>
                    <Icon path={mdiSync} />
                </button>
            </div>
        </div>
    );
}
