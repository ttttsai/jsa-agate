import React from 'react';
import {withRouter} from 'react-router-dom';
import './style.scss';

class CommonHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {'theme': this.decideTheme()};
  }
  componentDidMount() {
    const that = this;

    this.refs.menuButton.addEventListener('click', function(event) {
      that.props.history.push('/');
    });
    if (this.state.theme === 'dark') {
      document.getElementById('root').classList.add('root-dark');
    } else {
      document.getElementById('root').classList.remove('root-dark');
    }
  }
  decideTheme() {
    let theme = 'red';
    let storedTheme = localStorage.getItem('theme');
  
    if (storedTheme && (storedTheme === 'red' || storedTheme === 'dark')) {
      theme = storedTheme;
    } else {
      localStorage.setItem('theme', theme);
    }
  
    return theme;
  }
  render() {
    return (
      <div className="common-header">
        <div className="menu" ref="menuButton"></div>
        <div className="avatar"></div>
      </div>
    );
  }
}

export default withRouter(CommonHeader);
