import React from 'react';
import {withRouter} from 'react-router-dom';
import Spin from 'antd/lib/spin';
import 'antd/lib/spin/style/index.css';
import './style.scss';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: false};
  }
  goToRegisterPage() {
    this.props.history.push('/register');
  }
  render() {
    const formClassNames = this.props.formHasError ?
      'login-box error-form-box' : 'login-box';
    const {loading, onSubmit, errMsg} = this.props;

    return (
      <div className={formClassNames}>
        <Spin spinning={loading}>
          <h1>Log in</h1>
          <form method="post" onSubmit={onSubmit}>
            <p className="form-error-message">{errMsg}</p>
            <input name="username" required placeholder="Username" />
            <input type="password" name="password" required
              placeholder="Password"/>
            <input type="submit" value="Log in"/>
          </form>
          <button onClick={this.goToRegisterPage.bind(this)}>Register</button>
        </Spin>
      </div>
    );
  }
}

export default withRouter(LoginForm);
