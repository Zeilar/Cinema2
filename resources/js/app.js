import App from './components/App';
import ReactDOM from 'react-dom';
import React from 'react';
import './bootstrap';

const app = document.getElementById('app');
if (app) {
    ReactDOM.render(
        <App />,
        app
    );
}
