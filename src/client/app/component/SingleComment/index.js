import React from 'react';
import Avatar from 'antd/lib/avatar';
import 'antd/lib/avatar/style/index.css';
import Rate from 'antd/lib/rate';
import 'antd/lib/rate/style/index.css';
import './style.scss';

class SingleComment extends React.Component {
  render() {
    let data = this.props.info;
    let score = data.rating;
    let commentSentences = data.comment;
    let username = data.username;
    const character = '★';

    return (
      <div className="single-comment-container">
        <div>
          <Avatar src={data.avatar} size="large" />
        </div>
        <div className="comment-details">
          <div className="comment-username">{username}</div>
          <Rate character={character} style={{fontSize: 14}}
            disabled allowHalf defaultValue={score}/>
          <div className="comment-content">{commentSentences}</div>
        </div>
      </div>
    );
  }
}

export default SingleComment;
