import React from 'react';
import HomePageMap from '../HomePageMap';
import './style.scss';

class SingleBusinessMapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {location: ''};
  }
  render() {
    const mapType = 'detail';
    const {businessDetail} = this.props;

    return (
      <div className="detail-page-map-container">
        <HomePageMap businesses=
          {[businessDetail]} mapType={mapType} />
        <div className="detail-page-map-container-information">
          <p>Location: {businessDetail.address
            || (businessDetail.longitude + ', ' + businessDetail.latitude)}</p>
          <p>Keyword: {businessDetail.keyword}</p>
        </div>
      </div>);
  }
}

export default SingleBusinessMapContainer;
