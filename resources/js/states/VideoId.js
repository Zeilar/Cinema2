import React, { useState, createContext } from 'react';

export const VideoIdContext = createContext();

export function VideoIdProvider({ children }) {
    const [videoId, setVideoId] = useState('dQw4w9WgXcQ');

    return (
        <VideoIdContext.Provider value={[videoId, setVideoId]}>
            {children}
        </VideoIdContext.Provider>
    );
}
