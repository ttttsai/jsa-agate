import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import HomePage from '../HomePage';
import LoginPage from '../LoginPage';
import RegisterPage from '../RegisterPage';
import SingleBusinessPage from '../SingleBusinessPage';
import './style.scss';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/business/:id" component={SingleBusinessPage} />
        </div>
      </Router>
    );
  }
}

export default App;
