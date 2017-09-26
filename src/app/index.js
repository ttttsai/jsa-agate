const React = require('react');
const ReactDOM = require('react-dom');
const HeaderStyle = require('./scss/styles.scss');

class ReactHeader extends React.Component{
  render() {
    return (
      <div>
        <header>Hello World!</header>
      </div>);
  }
}

ReactDOM.render(<ReactHeader />, document.getElementById('root'));
