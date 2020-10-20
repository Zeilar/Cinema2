import React, { useState, useRef, useEffect } from 'react';

import Trash from '../../../storage/app/public/icons/trash.svg';
console.log(Trash);

export default function Video({ videoId, deleteVideo }) {
    async function playVideo() {
        const args = {
            method: 'POST',
            headers: {
                'X-CSRF-Token': document.querySelector('[name=csrf-token]').getAttribute('content'),
            },
        };
        await fetch(`${location.origin}/api/videos/${videoId}/play`, args);
    }

    return (
        <div className="video mb-2">
            <img className="videoThumbnail d-flex" src={`https://img.youtube.com/vi/${videoId}/0.jpg`} alt="Thumbnail" />
            <button className="videoDelete" onClick={() => deleteVideo(videoId)}>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                </svg>
            </button>
            <button className="videoPlay center-self" title="Play video" onClick={playVideo}>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M1,21H23L12,2" />
                </svg>
            </button>
        </div>
    );
}
