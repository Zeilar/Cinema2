import React, { useState, useEffect } from 'react';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { userReducer } from './User';
import { createStore } from 'redux';
import Playlist from './Playlist';
import NewUser from './NewUser';
import Player from './Player';
import Chat from './Chat';

const allReducers = combineReducers({
    user: userReducer,
});

const states = createStore(allReducers);

export default function App() {
    const [user, setUser] = useState(localStorage.getItem('user'));

    return (
        <Provider store={states}>
            {
                !user
                    ? <NewUser />
                    : <>
                        <Playlist />
                        <Player />
                        <Chat />
                    </>
            }
        </Provider>
    );
}
