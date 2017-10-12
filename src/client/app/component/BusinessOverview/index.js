import React from 'react';
import './style.scss';
import SingleBusinessOverview from '../SingleBusinessOverview';
import {imagesDetails} from './imagesDetails';

class BusinessOverview extends React.Component {
  render() {
    let allBusiness = imagesDetails.map((item, index) => {
      item.businessTitle = index+1 + '. ' + item.businessTitle;
      return <SingleBusinessOverview itemInfo={item} />;
    });

    return (
      <div id="business-overview-container">
        <div className="business-overview-title">
          The Best places you should not miss in Osaka</div>
        {allBusiness}
      </div>
    );
  }
}

export default BusinessOverview;
