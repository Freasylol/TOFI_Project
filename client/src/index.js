import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from './store/userStore';
import DeviceStore from './store/ObjectStore';

export const Context = createContext(null); 
console.log(process.env.REACT_APP_API_URL);

ReactDOM.render(
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
    document.getElementById('root')
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
