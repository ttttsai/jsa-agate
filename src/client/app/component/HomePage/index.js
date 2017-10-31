import React from 'react';
import HomePageHeader from '../HomePageHeader';
import HomePageContainer from '../HomePageContainer';
import HomePageMap from '../HomePageMap';
import notification from 'antd/lib/notification';

import 'antd/lib/notification/style/index.css';
import './style.scss';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {businesses: [], constBusinesses: [], displayBusinesses: []};
    this.filterBusinesses = this.filterBusinesses.bind(this);
    this.setDisplayBusinesses = this.setDisplayBusinesses.bind(this);
  }
  filterBusinesses(inputStr, objKey, collection) {
    const filteredBusinesses =
      () => this.state[collection].filter((el) =>
        this.searchString(el[objKey].toLowerCase(), inputStr.toLowerCase()));

    this.setState({businesses: filteredBusinesses()});
  }
  setDisplayBusinesses() {
    this.setState({displayBusinesses: this.state.businesses});
  }
  searchString(business, inputStr) {
    return business.includes(inputStr);
  }
  componentWillMount() {
    this.fetchBusinesses();
  }
  errorHandler(err) {
    notification.open({
      message: err.message,
      description: 'Please try again.',
      placement: 'bottomLeft',
    });
  }
  fetchBusinesses() {
    let that = this;

    fetch('/api/businesses').then(function(response) {
      return response.json();
    }).then(function(value) {
      if (value.error) {
        throw new Error(value.error);
      } else {
        that.setState({
          businesses: value.businesses,
          constBusinesses: value.businesses,
          displayBusinesses: value.businesses,
        });
      }
    }).catch(function(err) {
      that.errorHandler(err);
    });
  }
  render() {
    return (
      <div className="home-page">
        <div className="home-page-main">
          <HomePageHeader search={this.filterBusinesses}/>
          <HomePageContainer businesses={this.state.businesses}
            navigation={this.filterBusinesses}
            setDisplayBiz={this.setDisplayBusinesses}/>
        </div>
        <HomePageMap businesses={this.state.businesses}/>
      </div>
    );
  }
}

export default HomePage;

