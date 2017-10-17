import React from 'react';
import {Redirect} from 'react-router-dom';
import RegisterForm from '../RegisterForm';
import Header from '../CommonHeader';
import './style.scss';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'loading': false,
      'successRegister': false,
      'formHasError': false,
    };
  }
  submitHandler(event) {
    this.setState({'loading': true});
    event.preventDefault();
    let password = event.target.elements[1].value;
    let retypePassword = event.target.elements[2].value;

    this.validatePasswords(password, retypePassword);
  }

  validatePasswords(password, retypePassword) {
    if (password != retypePassword) {
      this.setState({'loading': false});
      this.setState({
        'errMsg': 'Passwords are not the same.',
        'formHasError': true,
      });
    } else {
      this.submitData({
        username: event.target.elements[0].value,
        password: password,
      });
    }
  }
  submitData(data) {
    let that = this;
    let myHeaders = new Headers();
    let myInit = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: myHeaders,
    };

    myHeaders.append('content-type', 'application/json');

    fetch('/api/register', myInit).then(function(response) {
      return response.json();
    }).then(function(value) {
      that.setState({'loading': false});
      if (value.status === '409') {
        throw new Error(value.status);
      } else {
        that.successHandler();
      }
    }).catch(function(err) {
      that.errorHandler(err);
    });
  }
  successHandler() {
    this.setState({'errMsg': '', 'formHasError': false});
    this.setState({'successRegister': true});
  }
  errorHandler(err) {
    if (err.message == '409') {
      this.setState({
        'errMsg': 'User name has been used.',
        'formHasError': true,
      });
    }
  }
  render() {
    const {successRegister, loading, errMsg, formHasError} = this.state;

    return successRegister ? (<Redirect to="/login" />) : (
      <div className="register-page">
        <Header />
        <div className="register-page-content">
          <RegisterForm onSubmit={this.submitHandler.bind(this)}
            loading={loading} errMsg={errMsg}
            formHasError={formHasError} />
        </div>
      </div>
    );
  }
}

export default RegisterPage;
