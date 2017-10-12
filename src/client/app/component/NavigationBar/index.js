import React from 'react';
import './style.scss';

class NavigationBar extends React.Component {
  constructor() {
    super();
    this.state = {
      addClass: '1-link',
    };
  }

  handleClickLink(event) {
    this.setState({addClass: '1-link'});
  }

  render() {
    return (
      <div>
        <div className="nav-title">
          <h1>Browsing Osaka</h1>
        </div>
        <nav id="nav-container">
          <a href="#" id="1-link"
            className=
              {this.state.addClass !== '1-link'?
                'nav-link-origin':'nav-link-change'}
            onClick={this.handleClickLink.bind(this)}>OVERVIEW</a>
          <a href="#" id="2-link"
            className=
              {this.state.addClass !== '2-link'?
                'nav-link-origin':'nav-link-change'}
            onClick={this.handleClickLink.bind(this)}>RESTARUANTS</a>
          <a href="#" id="3-link"
            className=
              {this.state.addClass !== '3-link'?
                'nav-link-origin':'nav-link-change'}
            onClick={this.handleClickLink.bind(this)}>NIGHTLIFE</a>
          <a href="#" id="4-link"
            className=
              {this.state.addClass !== '4-link'?
                'nav-link-origin':'nav-link-change'}
            onClick={this.handleClickLink.bind(this)}>HOME SERVICE</a>
          <a href="#" id="5-link"
            className=
              {this.state.addClass !== '5-link'?
                'nav-link-origin':'nav-link-change'}
            onClick={this.handleClickLink.bind(this)}>
            WRITE A REVIEW
            <img id="comment-img" src="./images/edit.png"/></a>
        </nav>
      </div>
    );
  }
}

export default NavigationBar;
