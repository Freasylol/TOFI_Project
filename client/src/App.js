import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './pages/Main';
import Admin from './pages/Admin';
import DashBoard from './pages/DashBoard';
import Shop from './pages/Shop'
import {Context} from './index'
 
function App() {
  // const {user} = useContext(Context)

  // console.log(user)
  return (
    <div className="App">
      <DashBoard />
      <Router>
          <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/admin" exact component={Admin} />
              <Route path="/shop" exact component={Shop} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;