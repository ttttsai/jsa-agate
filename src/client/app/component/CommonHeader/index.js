import React from 'react';
import {withRouter} from 'react-router-dom';
import './style.scss';

class CommonHeader extends React.Component {
  componentDidMount() {
    const that = this;

    this.refs.menuButton.addEventListener('click', function(event) {
      that.props.history.push('/');
    });
  }

  render() {
    return (
      <div className="common-header">
        <div className="menu" ref="menuButton"></div>
        <div className="avatar"></div>
      </div>
    );
  }
}

export default withRouter(CommonHeader);
