import React from 'react';
import './style.scss';

class NavigationBar extends React.Component {
  render() {
    return (
      <div>
        <div className="nav-title">
          <h1>Browsing Osaka</h1>
        </div>
        <nav id="nav-container">
          <a href="#" id="1-link" className= 'nav-link-change'>Overview</a>
          <a href="#" id="2-link" className= 'nav-link-origin'>Restaurants</a>
          <a href="#" id="3-link" className= 'nav-link-origin'>Nighlife</a>
          <a href="#" id="4-link" className= 'nav-link-origin'>Home Service</a>
          <a href="#" id="5-link" className= 'nav-link-origin'>Write a review
            <img id="comment-img" src="./images/edit.png"/></a>
        </nav>
      </div>
    );
  }
}

export default NavigationBar;
