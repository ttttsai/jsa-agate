import React from 'react';
import './style.scss';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="login-box">
        <h1>Log in</h1>
        <form>
          <input type="email" name="email" required placeholder="E-mail" />
          <input type="password" name="password" required
            placeholder="Password"/>
          <input type="submit" value="login"/>
        </form>
        <button>Register</button>
      </div>
    );
  }
}

export default LoginForm;
