import React from 'react';
import './style.scss';
import SingleComment from '../SingleComment';

class CommentList extends React.Component {
  render() {
    let allComments = [];

    if (this.props.comments && this.props.comments.length) {
      allComments = this.props.comments.map(
        (element) => <SingleComment info={element}/>
      );
    }

    return (
      <div className="comment-list-container">
        <h2 className="comment-list-title">Comments</h2>
        <div className="comment-list">
          {allComments}
        </div>
      </div>
    );
  }
}

export default CommentList;

