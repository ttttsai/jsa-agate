import React from 'react';
import './style.scss';

class HomePageHeader extends React.Component {
  submitHandler(event) {
    event.preventDefault();
    const input = event.target.elements[0].value;

    this.props.search(input)();
  }
  keyUPHandler(event) {
    const input = event.target.value;

    this.props.search(input)();
  }

  render() {
    return (
      <div className = "home-page-header">
        <div className="menu"></div>
        <form className="header" onSubmit={this.submitHandler.bind(this)}
          onKeyUp={this.keyUPHandler.bind(this)}>
          <input className="search" type="search" id="mySearch"
            placeholder="Search"/>
        </form>
      </div>
    );
  }
}

export default HomePageHeader;
