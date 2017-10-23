import React from 'react';
import './style.scss';

class NavigationBar extends React.Component {
  render() {
    return (
      <div>
        <div className="nav-title">
          <h1>Browsing Shenzhen</h1>
        </div>
        <nav className="nav-container">
          <a href="#" className="nav-link-change">Overview</a>
          <a href="#" className="nav-link-origin">Restaurants</a>
          <a href="#" className="nav-link-origin">Nightlife</a>
          <a href="#" className="nav-link-origin">Home Service</a>
        </nav>
      </div>
    );
  }
}

export default NavigationBar;
