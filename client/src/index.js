import React, {createContext} from 'react';
// import ReactDOM from 'react-dom/client';
import './index.css';
import {render} from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from './store/userStore';
import DeviceStore from './store/ObjectStore';

export const Context = createContext(null); 
console.log(process.env.REACT_APP_API_URL);

const root = document.getElementById('root');
render(
    <Context.Provider value ={{
        user: new UserStore,
        object: new DeviceStore
    }}>
        <div>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </div>,
        
    </Context.Provider>,
    root
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
