import React, { useState, createContext } from 'react';

export const VideosContext = createContext();

export function VideosProvider({ children }) {
    const [videos, setVideos] = useState();

    return (
        <VideosContext.Provider value={[videos, setVideos]}>
            {children}
        </VideosContext.Provider>
    );
}
