import React from 'react';
import NavigationBar from '../NavigationBar';
import BusinessOverview from '../BusinessOverview';
import './style.scss';

class HomePageContainer extends React.Component {
  render() {
    return (
      <div className = "home-page-container">
        <NavigationBar />
        <BusinessOverview businesses={this.props.businesses}/>
      </div>
    );
  }
}

export default HomePageContainer;
