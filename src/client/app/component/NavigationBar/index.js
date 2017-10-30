import React from 'react';
import './style.scss';

class NavigationBar extends React.Component {
  categoryFilter(arrList) {
    const that = this;

    arrList.map((element) => element.addEventListener('click', function(event) {
      const category = element.innerText;

      const selectedNav = document.
        getElementsByClassName('nav-link-selected')[0];

      selectedNav.classList.remove('nav-link-selected');

      element.classList.add('nav-link-selected');
      if (category !== 'OVERVIEW') {
        that.props.navigation(category, 'category');
      } else {
        that.props.navigation('', 'name');
      }
    })
    );
  }
  componentDidMount() {
    const that = this;
    const navContainer = document.getElementsByClassName('nav-container')[0];
    const navLinkOrigin = Array.from(navContainer.getElementsByTagName('a'));

    that.categoryFilter(navLinkOrigin);
  }

  render() {
    return (
      <div className="home-page-navigation-container">
        <div className="nav-title">
          <h1>Browsing Shenzhen</h1>
        </div>
        <nav className="nav-container">
          <a href="#" className="nav-link-selected">Overview</a>
          <a href="#">Restaurants</a>
          <a href="#">Nightlife</a>
          <a href="#">Home Service</a>
        </nav>
      </div>
    );
  }
}

export default NavigationBar;
