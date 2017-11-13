import React from 'react';
import NavigationBar from '../NavigationBar';
import BusinessOverview from '../BusinessOverview';
import './style.scss';

class HomePageContainer extends React.Component {
  render() {
    return (
      <div className = "home-page-container">
        <NavigationBar navigation={this.props.navigation}
          setDisplayBiz={this.props.setDisplayBiz}/>
        <BusinessOverview businesses={this.props.businesses}/>
      </div>
    );
  }
}

export default HomePageContainer;
