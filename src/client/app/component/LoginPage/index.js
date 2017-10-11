import React from 'react';
import LoginForm from '../LoginForm';
import Header from '../CommonHeader';
import './style.scss';

class LoginPage extends React.Component {
  render() {
    return (
      <div className="login-page">
        <Header />
        <div className="login-page-content">
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default LoginPage;
