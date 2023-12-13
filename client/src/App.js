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

  // console.log(user)
  return (
    <div className="App">
      <DashBoard />
      {/* <Router>
          <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/admin" exact component={Admin} />
              <Route path="/shop" exact component={Shop} />
              <Route path="/deposit" exact component={Deposit} />
              <Route path="/credit" exact component={Credit} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/aim" exact component={Aim} />
          </Switch>
      </Router> */}
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    </div>
  );
}

export default App;