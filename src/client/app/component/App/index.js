import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import ReactHeader from '../ReactHeader';
import LoginPage from '../LoginPage';
import './style.scss';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={ReactHeader} />
          <Route path="/login" component={LoginPage} />
        </div>
      </Router>
    );
  }
}

export default App;
