import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from "react-dom/client";
import {thunk} from 'redux-thunk';

import App from './components/App';
import {createStoreHook, Provider} from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import reducers from './reducers/index';


const store = createStore(reducers,{},applyMiddleware(thunk));

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);
root.render(<Provider store = {store}>
        <App/>
</Provider>);

console.log('stripe key is',process.env.REACT_APP_STRIPE_KEY);
console.log('Env : ',process.env.NODE_ENV);