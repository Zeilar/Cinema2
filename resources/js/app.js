import { videoIdReducer } from './states/VideoId';
import { userReducer } from './states/User';
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import ReactDOM from 'react-dom';
import React from 'react';
import './bootstrap';

const app = document.getElementById('app');
if (app) {
    const allReducers = combineReducers({
        videoId: videoIdReducer,
        user: userReducer,
    });
    const states = createStore(allReducers);

    ReactDOM.render(
        <Provider store={states}>
            <App />
        </Provider>,
        app
    );
}
