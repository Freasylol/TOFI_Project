import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Admin from './pages/Admin';
import DashBoard from './pages/DashBoard';
import Shop from './pages/Shop';
import Deposit from './pages/Deposit';
import Credit from './pages/Credit';
import Aim from './pages/Aim';
import Profile from './pages/Profile';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import AppRouter from './components/AppRouter';

function App() {

  return (
    <div className="App">
      <DashBoard />
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    </div>
  );
}

export default App;