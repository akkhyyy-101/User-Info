import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={UserList} />
          <Route path="/user/:id" component={UserDetails} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
