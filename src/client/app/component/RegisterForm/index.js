import React from 'react';
import {withRouter} from 'react-router-dom';
import {Spin} from 'antd';
import 'antd/lib/spin/style/index.css';
import './style.scss';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: false};
  }
  goToLoginPage() {
    this.props.history.push('/login');
  }
  render() {
    const formClassNames = this.props.formHasError ?
      'register-box error-form-box' : 'login-box';
    const {loading, onSubmit, errMsg} = this.props;
    const passwordFormat = '^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])' +
    '[A-Za-z\\d$@$!%*#?&]{6,50}$';

    return (
      <div className={formClassNames}>
        <Spin spinning={loading}>
          <h1>Sign up</h1>
          <form method="post" onSubmit={onSubmit}>
            <p className="form-error-message">{errMsg}</p>
            <input title="Username must be 3 to 15 letters" type="text"
              name="username" placeholder="Username" pattern="[A-Za-z]{3,15}"
              required />
            <input title="Minimum six characters, at least one letter,
            one number and one special character"
              type="password" name="password" placeholder="Password"
              pattern={passwordFormat}
              required/>
            <input title="Minimum six characters, at least one letter,
            one number and one special character"
              type="password" name="retype-password"
              placeholder="Re-type Password" pattern={passwordFormat}
              required/>
            <input type="submit" value="Register me!"/>
          </form>
          <button onClick={this.goToLoginPage.bind(this)}>Log in</button>
        </Spin>
      </div>
    );
  }
}

export default withRouter(RegisterForm);
