import React from 'react';
import {withRouter} from 'react-router-dom';
import Spin from 'antd/lib/spin';
import 'antd/lib/spin/style/index.css';
import Rate from 'antd/lib/rate';
import 'antd/lib/rate/style/index.css';
import './style.scss';

class CreatingNewCommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'loading': false};
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(e) {
    this.props.onEnterShiftSubmit(e);
  }

  render() {
    const {loading, onSubmit, changeRating, rating} = this.props;

    return (
      <div className="creating-new-comment-form">
        <Spin spinning={loading}>
          <h2 className="comment-title">Write a comment</h2>
          <div className="business-info">
            <div className="business-info-name-rating">
              <h3 className="comment-business-name">{this.props.businessDetail.name}</h3>
              <p>Rating: {Number(this.props.businessDetail.rating).toFixed(2)}</p>
            </div>
          </div>
          <form className="comment-info"
            method="POST" name="comment-info-form"
            onSubmit={onSubmit} onKeyPress = {this.handleKeyPress}>
            <div className="comment-container">
              <div className="rating-container">
                <Rate allowHalf onChange={changeRating}
                  character="★" value={rating} />
              </div>
              <textarea rows="4" cols="50" name="comment-input"
                required placeholder="Add you comment" />
            </div>
            <input className="comment-submit"
              type="submit" value="Add Comment"/>
          </form>
        </Spin>
      </div>
    );
  }
}

export default withRouter(CreatingNewCommentForm);
