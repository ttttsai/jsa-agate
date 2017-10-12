import React from 'react';
import './style.scss';

class HomePageHeader extends React.Component {
  render() {
    return (
      <div className = "home-page-header">
        <div className="menu"></div>
        <form className="header">
          <input className="search" type="search" id="mySearch"
            placeholder="Search"/>
        </form>
      </div>
    );
  }
}

export default HomePageHeader;
