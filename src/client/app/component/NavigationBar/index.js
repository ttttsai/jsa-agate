import React from 'react';
import './style.scss';

class NavigationBar extends React.Component {
  render() {
    return (
      <div className="home-page-navigation-container">
        <div className="nav-title">
          <h1>Browsing Shenzhen</h1>
        </div>
        <nav className="nav-container">
          <a href="#" className="nav-link-clicked">Overview</a>
          <a href="#">Restaurants</a>
          <a href="#">Nightlife</a>
          <a href="#">Home Service</a>
        </nav>
      </div>
    );
  }
}

export default NavigationBar;
