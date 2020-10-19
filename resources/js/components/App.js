import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { addUser } from '../states/User';
import Playlist from './Playlist';
import NewUser from './NewUser';
import Player from './Player';
import Chat from './Chat';

export default function App() {
    const user = useSelector(state => state.user);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    async function authenticate() {
        await fetch('/api/authenticate')
            .then(response => response.status === 200 ? response.json() : false)
            .then(authenticated => {
                setLoading(false);
                if (authenticated) {
                    dispatch(addUser());
                }
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
