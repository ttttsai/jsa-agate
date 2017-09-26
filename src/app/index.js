var React = require('react');
var ReactDOM = require('react-dom');
require('./scss/styles.scss');

class ReactHeader extends React.Component{
    render(){
        return (
        <div>
          <h1>Hello World!</h1>
        </div>);
    }
}
ReactDOM.render(<ReactHeader />, document.querySelector(".center"));
