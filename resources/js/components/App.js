import React, { useState, useEffect } from 'react';
import { mdiLoading } from '@mdi/js';
import NewUser from './NewUser';
import Player from './Player';
import Icon from '@mdi/react';
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

    function render() {
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

    return loading ? <Icon className="loading center-self" path={mdiLoading} spin={1} /> : render();
}
