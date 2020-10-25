import React, { useState, useEffect } from 'react';
import { mdiLoading } from '@mdi/js';
import Http from '../classes/Http';
import NewUser from './NewUser';
import Player from './Player';
import Icon from '@mdi/react';
import Chat from './Chat';

export default function App() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(false);

    async function authenticate() {
        setUser(await Http.get('authenticate'));
        setLoading(false);
    }

    useEffect(() => {
        if (!user) authenticate();
    });

    function render() {
        return (
            <>
                {
                    !user
                        ? <NewUser setUser={setUser} />
                        : <>
                            <Player />
                            <Chat user={user} />
                        </>
                }
            </>
        );
    }

    return loading ? <Icon className="loading center-self" path={mdiLoading} spin={1} /> : render();
}
