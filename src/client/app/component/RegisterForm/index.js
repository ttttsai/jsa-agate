import React from 'react';
import './style.scss';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="register-box">
        <h1>Sign up</h1>
        <form>
          <input type="email" name="email" required placeholder="E-mail" />
          <input type="password" name="password" required
            placeholder="Password"/>
          <input type="password" name="retype-password" required
            placeholder="Re-type Password"/>
          <input type="submit" value="Register me!"/>
        </form>
        <button>Log in</button>
      </div>
    );
  }
}

export default RegisterForm;
