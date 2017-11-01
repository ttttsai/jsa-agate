import React from 'react';
import Rate from 'antd/lib/rate';
import 'antd/lib/rate/style/index.css';
import './style.scss';

class SingleBusinessTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let numberOfStar = this.props.rating || 0;
    let ratingScorePopUp = numberOfStar + ' rating';
    let showedRating = this.props.rating ? this.props.rating.toFixed(1) : 0;

    return (
      <div className="display-business-title">
        <div>
          <div className="single-business-name">
            <h1 className="single-business-title-name">{this.props.title}</h1>
          </div>
          <div className="single-business-rating" title={ratingScorePopUp}>
            <Rate allowHalf character="★" disabled
              value={numberOfStar} />
            <p>Rating: {showedRating}</p>
            <p>Tel: {this.props.phone}</p>
          </div>
        </div>
        <div className="single-business-links-container">
          <a onClick={this.props.goToCommentPage}>Write a Comment</a>
          <a>Add Photo</a>
          <a>Share</a>
          <a>Bookmark</a>
        </div>
      </div>
    );
  }
}

export default SingleBusinessTitle;
