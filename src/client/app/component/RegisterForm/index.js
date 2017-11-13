import React from 'react';
import {withRouter} from 'react-router-dom';
import Spin from 'antd/lib/spin';
import 'antd/lib/spin/style/index.css';
import './style.scss';
import Upload from 'antd/lib/upload';
import 'antd/lib/upload/style/index.css';

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: false};
    this.handleImageSubmit = this.handleImageSubmit.bind(this);
    this.onSubmitSignupForm = this.onSubmitSignupForm.bind(this);
  }
  goToLoginPage() {
    this.props.history.push('/login');
  }
  onSubmitSignupForm(e) {
    this.props.onSubmit(e, this.state.avatar);
  }
  getSignedRequest(file) {
    return fetch(`/sign-s3?fileName=${file.name}&fileType=${file.type}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
      });
  }

  uploadFile(binaryFile, signedRequest, url) {
    const options = {
      method: 'PUT',
      body: binaryFile,
    };

    return fetch(signedRequest, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return url;
      });
  }

  uploadToS3(file) {
    return this.getSignedRequest(file)
      .then((json) => this.uploadFile(file, json.signedRequest, json.url))
      .then((url) => {
        return url;
      }).catch((err) => {
        console.error(err);
        return null;
      });
  }

  handleImageSubmit(file) {
    const that = this;

    this.uploadToS3(file.file)
      .then((url) => {
        that.setState({avatar: url});
        file.onSuccess(file);
      });
  }
  render() {
    const formClassNames = this.props.formHasError ?
      'register-box error-form-box' : 'register-box';
    const {loading, errMsg} = this.props;
    const passwordFormat = '.{6,}';
    const props = {
      action: '/',
      customRequest: this.handleImageSubmit,
      listType: 'picture-card',
    };

    return (
      <div className={formClassNames}>
        <Spin spinning={loading}>
          <h1>Sign up</h1>
          <form method="post" onSubmit={this.onSubmitSignupForm}>
            <p className="form-error-message">{errMsg}</p>
            <input title="Username must be 3 to 15 letters" type="text"
              name="username" placeholder="Username" pattern="[A-Za-z]{3,15}"
              required />
            <input title="Minimum six characters"
              type="password" name="password" placeholder="Password"
              pattern={passwordFormat}
              required/>
            <input title="Minimum six characters"
              type="password" name="retype-password"
              placeholder="Re-type Password" pattern={passwordFormat}
              required/>
            <div className="sign-up-page-avatar">
              <Upload {...props}>
                {this.state.avatar ? null :
                  <div className="signup-page-upload-btn">
                    Click to Upload Avatar
                  </div>}
              </Upload>
            </div>
            <input type="submit" value="Register me!"/>
          </form>
          <button onClick={this.goToLoginPage.bind(this)}>Log in</button>
        </Spin>
      </div>
    );
  }
}

export default withRouter(RegisterForm);
