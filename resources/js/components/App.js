import React, { useState, useEffect } from 'react';
import NewUser from './NewUser';
import Player from './Player';
import Chat from './Chat';

export default function App() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(false);

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
                        ? <NewUser setUser={setUser} />
                        : <>
                            <Player />
                            <Chat />
                        </>
                }
            </>
        )
    }

    return !loading && render();
}
