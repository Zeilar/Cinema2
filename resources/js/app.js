import { VideoIdProvider } from './states/VideoId';
import { UserProvider } from './states/User';
import App from './components/App';
import ReactDOM from 'react-dom';
import React from 'react';
import './bootstrap';

const app = document.getElementById('app');
if (app) {
    ReactDOM.render(
        <UserProvider value={false}>
            <VideoIdProvider value="dQw4w9WgXcQ">
                <App />
            </VideoIdProvider>
        </UserProvider>,
        app
    );
}
