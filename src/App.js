import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import NewPhone from './pages/NewPhone';
import Edit from './pages/Edit';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/phones/new' component={NewPhone} />
          <Route path='/phones/:id/edit' component={Edit} />
          <Route path='/phones/:id' component={Detail} />
        </Switch>
      </Router>
    );
  }
}

export default App;
