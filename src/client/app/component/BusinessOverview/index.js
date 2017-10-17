import React from 'react';
import './style.scss';
import BusinessCard from '../BusinessCard';

class BusinessOverview extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let allBusiness = this.props.businesses.map(
      (item, index) => <BusinessCard itemInfo={item} />);

    return (
      <div className="business-overview-container scrollbar scrollbar-style">
        <div className="business-overview-title">
          The Best places you should not miss in Shenzhen</div>
        {allBusiness}
      </div>
    );
  }
}

export default BusinessOverview;
