import React from 'react';
import HomePageHeader from '../HomePageHeader';
import HomePageContainer from '../HomePageContainer';
import HomePageMap from '../HomePageMap';
import {notification} from 'antd';

import 'antd/lib/notification/style/index.css';
import './style.scss';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {businesses: [], constBusinesses: []};
  }
  filterBusinesses(inputStr) {
    const filteredBusinesses =
      () => this.state.constBusinesses.filter((el) =>
        this.searchString(el.name.toLowerCase(), inputStr.toLowerCase()));

    return () => {
      this.setState({businesses: filteredBusinesses()});
    };
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
          <HomePageHeader search={this.filterBusinesses.bind(this)}/>
          <HomePageContainer businesses={this.state.businesses}/>
        </div>
        <HomePageMap businesses={this.state.businesses}/>
      </div>
    );
  }
}

export default HomePage;

