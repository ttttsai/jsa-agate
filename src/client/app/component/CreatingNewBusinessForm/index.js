import React from 'react';
import {withRouter} from 'react-router-dom';
import Spin from 'antd/lib/spin';
import 'antd/lib/spin/style/index.css';
import './style.scss';

class CreatingNewBusinessForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: false};
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.address) {
      this.setState({address: nextProps.address});
    }
  }
  render() {
    const {loading, onSubmit, address} = this.props;

    return (
      <div className="creating-new-business-form">
        <Spin spinning={loading}>
          <h1>Add Your Business</h1>
          <p>Add information about your business below.</p>
          <form className="business-info"
            method="POST" name="business-info-form"
            onSubmit={onSubmit}>
            <label htmlFor="business-name">Business Name</label>
            <input name="name" id="business-name"
              type="text" placeholder="Mel's Diner" required/>
            <label htmlFor="business-description">Business Description</label>
            <input name="description" id="business-description" required
              type="text" placeholder="Organic Coffee, Natural Food"/>
            <label htmlFor="business-address">Address</label>
            <input name="address" id="business-address"
              type="text" placeholder="Click the map to get the address..."
              value={address} required readOnly/>
            <label htmlFor="business-phone">Phone</label>
            <input name="phone" id="business-phone" required
              type="text" placeholder="+86 136 8888 8888"/>
            <label htmlFor="business-key-words">Key Words</label>
            <input name="key-words" id="business-key-words" required
              type="text" placeholder="Coffee Asian ..."/>
            <label htmlFor="image-url">Images url</label>
            <textarea id="image-url" rows="3" placeholder=
              "Highly recommend to input 3 images and seperate them into 3 lines."
            required></textarea>
            <input className="business-submit"
              type="submit" value="Add business"/>
          </form>
        </Spin>
      </div>
    );
  }
}

export default withRouter(CreatingNewBusinessForm);
