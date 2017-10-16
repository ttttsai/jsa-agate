import React from 'react';
import {Redirect} from 'react-router-dom';
import LoginForm from '../LoginForm';
import Header from '../CommonHeader';
import './style.scss';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'loading': false,
      'isLoggedIn': localStorage.getItem('Authorization') !== null,
      'formHasError': false,
    };
  }
  submitHandler(event) {
    this.setState({'loading': true});
    event.preventDefault();
    this.submitData({
      username: event.target.elements[0].value,
      password: event.target.elements[1].value,
    });
  }
  errorHandler(err) {
    this.setState({'errMsg': err.message, 'formHasError': true});
    localStorage.removeItem('Authorization');
  }
  successHandler(token) {
    this.setState({'errMsg': '', 'formHasError': false});
    localStorage.setItem('Authorization', token);
    this.setState({'isLoggedIn': true});
  }
  submitData(data) {
    let that = this;
    let myHeaders = new Headers();
    let myInit = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: myHeaders,
    };

    myHeaders.append('Content-Type', 'application/json');

    fetch('/api/login', myInit).then(function(response) {
      return response.json();
    }).then(function(value) {
      that.setState({'loading': false});
      if (value.error) {
        throw new Error(value.error);
      } else {
        that.successHandler(value.token);
      }
    }).catch(function(err) {
      that.errorHandler(err);
    });
  }
  render() {
    const {isLoggedIn, loading, errMsg, formHasError} = this.state;

    return isLoggedIn ? (<Redirect to="/" />) : (
      <div className="login-page">
        <Header />
        <div className="login-page-content">
          <LoginForm onSubmit={this.submitHandler.bind(this)}
            loading={loading} errMsg={errMsg}
            formHasError={formHasError}/>
        </div>
      </div>
    );
  }
}

export default LoginPage;
