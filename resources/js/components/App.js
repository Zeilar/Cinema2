import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../states/User';
import Playlist from './Playlist';
import NewUser from './NewUser';
import Player from './Player';
import Chat from './Chat';

export default function App() {
    const [user, setUser] = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    async function authenticate() {
        await fetch('/api/authenticate')
            .then(response => response.status === 200 ? response.json() : false)
            .then(authenticated => {
                setLoading(false);
                if (authenticated) setUser(true);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }

    useEffect(() => {
        if (!user) authenticate();
    }, [user, authenticate]);

    const render = () => {
        return (
            <>
                {
                    !user
                        ? <NewUser />
                        : <>
                            <Playlist />
                            <Player />
                            <Chat />
                        </>
                }
            </>
        )
    }

    return !loading && render();
}
