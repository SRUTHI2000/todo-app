import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import RoutesforApp from './routes.jsx';
import { store } from './store';

ReactDOM.render(
    <Provider store={store}>
        <RoutesforApp />
    </Provider>
    , document.getElementById('app')
);