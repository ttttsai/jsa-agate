import React from 'react';
import RegisterForm from '../RegisterForm';
import Header from '../CommonHeader';
import './style.scss';

class RegisterPage extends React.Component {
  render() {
    return (
      <div className="register-page">
        <Header />
        <div className="register-page-content">
          <RegisterForm />
        </div>
      </div>
    );
  }
}

export default RegisterPage;
