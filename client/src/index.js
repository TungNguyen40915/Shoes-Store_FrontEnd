import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom';

// Store
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import myReducer from './redux/reducers/index';

ReactDOM.render(
    <Provider store={createStore(myReducer)}>
        <BrowserRouter>
             <App/>
        </BrowserRouter>
    
</Provider>, document.getElementById('root'));

serviceWorker.register();
