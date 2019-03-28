import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './components/Header';
import Politicians from './pages/Politicians';
import Details from './pages/Details';
import Create from './pages/Create';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Router>
          <Switch>
            <Route exact path='/' component={Politicians}/>
            <Route path='/create' component={Create} />
            <Route path='/:id' component={Details}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
