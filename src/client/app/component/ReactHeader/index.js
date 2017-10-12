import React from 'react';
import './style.scss';
import BusinessOverview from '../BusinessOverview';


class ReactHeader extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello React</h1>
        <BusinessOverview />
      </div>);
  }
}

export default ReactHeader;
