import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux'; // keeps track of store -> global state
import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import reducers from './reducers';

import './index.css';

import App from './App';
import {configureStore} from "@reduxjs/toolkit";

// const store = createStore(reducers, compose(applyMiddleware(thunk)));

const store = configureStore({
    reducer: reducers,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
