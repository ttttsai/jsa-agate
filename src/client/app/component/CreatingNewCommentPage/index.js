import React from 'react';
import {Redirect} from 'react-router-dom';
import CreatingNewCommentForm from '../CreatingNewCommentForm';
import Header from '../HomePageHeader';
import notification from 'antd/lib/notification';
import 'antd/lib/notification/style/index.css';
import './style.scss';

class CreatingNewCommentPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'loading': false,
      'rating': 0,
    };
  }

  changeRating(event) {
    this.setState({'rating': event});
  }
  submitHandler(event) {
    this.setState({'loading': true});
    event.preventDefault();
    this.submitData({
      comment: event.target.elements[0].value,
      rating: this.state.rating,
    });
  }

  keyPressSubmitHandler(event) {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        this.setState({'loading': true});
        this.submitData({
          comment: event.target.value,
          rating: this.state.rating,
        });
      }
    }
  }
  errorHandler(err) {
    notification.open({
      message: err.message,
      description: 'Please try again.',
      placement: 'bottomLeft',
    });
  }
  successHandler() {
    this.props.handleSubmitComment();
  }

  submitData(data) {
    let that = this;
    let myHeaders = new Headers();
    let myInt = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: myHeaders,
    };

    let jwtToken = localStorage.getItem('Authorization');

    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Bearer ' + jwtToken);

    let businessId = this.props.businessDetail._id;

    fetch('/api/businesses/' + businessId + '/comments', myInt).then(
      function(response) {
        return response.json();
      }).then(
      function(value) {
        that.setState({'loading': false});
        if (value.error) {
          throw new Error(value.error);
        } else {
          that.successHandler();
        }
      }).catch(function(err) {
      that.errorHandler(err);
    });
  }
  render() {
    const {loading, rating} = this.state;

    return (
      <div className="creating-new-comment">
        <Header/>
        <main className="content-container">
          <CreatingNewCommentForm onSubmit={this.submitHandler.bind(this)}
            onEnterShiftSubmit={this.keyPressSubmitHandler.bind(this)}
            loading={loading}
            changeRating={this.changeRating.bind(this)}
            rating={rating}
            businessDetail={this.props.businessDetail}/>
        </main>
      </div>
    );
  }
}

export default CreatingNewCommentPage;
