import React from 'react';
import './style.scss';

class CommonHeader extends React.Component {
  render() {
    return (
      <div className="common-header">
        <div className="menu"></div>
        <div className="avatar"></div>
      </div>
    );
  }
}

export default CommonHeader;
