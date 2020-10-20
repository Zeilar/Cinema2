import React, { useState, useRef, useEffect, useContext } from 'react';
import { VideosContext } from '../states/Videos';
import Video from './Video';

export default function Playlist() {
    const [videos, setVideos] = useContext(VideosContext);
    const [inputError, setInputError] = useState();
    const input = useRef();

    async function videoSubmit(e) {
        if (e.key !== 'Enter' || input.current?.value === '') return; // error message handling

        let url = '';
        try {
            url = new URL(input.current.value);
        } catch (e) {
            return alert('Invalid URL, please try again\nMake sure it contains "v="'); // error message handling
        }
        const parameters = new URLSearchParams(url.search);
        const videoId = parameters.get('v');

        if (!videoId) return;

        const formData = new FormData();
        formData.append('videoId', videoId);

        const args = {
            method: 'POST',
            headers: {
                'X-CSRF-Token': document.querySelector('[name=csrf-token]').getAttribute('content'),
            },
            body: formData,
        };

        await fetch(`${location.origin}/api/videos`, args)
            .then(response => {
                if (response.status === 422) {
                    return response.json();
                } else if (response.status !== 200) {
                    setInputError('Something went wrong!');
                }
            })
            .then(data => {
                if (data?.message) setInputError(data.message);
                input.current.value = '';
            });
    }

    useEffect(() => {
        window.Echo.join('playlist')
            .here(data => setVideos(data[0].videos.map(video => video.video_id)))
            .listen('AddVideo', ({ videoId }) => setVideos(p => [...p, videoId]))
            .listen('RemoveVideo', ({ videoId }) => {
                console.log('remove', videoId);
            });
    }, [setVideos]);

    return (
        <div className="playlist col w-25">
            <div className="videos overflow-auto">
                {videos?.map(videoId => <Video videoId={videoId} key={videoId} />)}
            </div>

            <div className="playlistAdd col">
                {inputError && <p className="form-error ml-1 mb-2">{inputError}</p>}
                <input
                    className="playlistInput w-100 border-0" onChange={() => setInputError(false)} ref={input}
                    placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" onKeyDown={videoSubmit}
                />
            </div>
        </div>
    );
}
