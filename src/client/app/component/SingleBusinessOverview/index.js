import React from 'react';
import './style.scss';

class SingleBusinessOverview extends React.Component {
  render() {
    return (
      <div className="single-business">
        <div className="image-container"
          style={this.props.itemInfo.businessImageUrl} >
          <span className="business-score">
            {this.props.itemInfo.businessScore}</span>
          <span className="business-name">
            {this.props.itemInfo.businessName}</span>
        </div>
        <p className="business-title">
          {this.props.itemInfo.businessTitle}</p>
        <p className="business-description">
          {this.props.itemInfo.businessDescription}</p>
        <div className="business-infor">
          <span className="business-keywords">
            {this.props.itemInfo.businessKeywords}</span>
          <a className="business-more" href={this.props.itemInfo.businessMore}>
            MORE</a>
        </div>
      </div>
    );
  }
}

export default SingleBusinessOverview;
