import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/carteira" exact component={ Wallet } />
      </Switch>
    );
  }
}

export default App;
