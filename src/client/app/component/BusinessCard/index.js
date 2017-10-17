import React from 'react';
import './style.scss';

class BusinessCard extends React.Component {
  render() {
    let data = this.props.itemInfo;
    let score = Math.floor(data.rating);
    let style = {background: 'url(' + data.imageUrl + ')'};

    data.score = '★'.repeat(score);

    return (
      <div className="single-business">
        <div className="image-container"
          style={style} >
          <span className="business-score">
            {data.score}</span>
          <span className="business-name">
            {data.name}</span>
        </div>
        <p className="business-title">
          {data.name}</p>
        <p className="business-description">
          {data.description}</p>
        <div className="business-infor">
          <span className="business-keywords">
            #{data.keyword}</span>
          <a className="business-more" href={data.businessMore}>
            More</a>
        </div>
      </div>
    );
  }
}

export default BusinessCard;
