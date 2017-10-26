import React from 'react';
import './style.scss';

class ImageDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.imagesErrorHanlder = this.imagesErrorHanlder.bind(this);
  }
  componentDidMount() {
    let imgContainer = document.getElementsByClassName('display-image')[0];

    imgContainer.addEventListener('mouseenter', function(event) {
      let center = document.getElementsByClassName('slot')[1];

      center.classList.remove('center');
    });

    imgContainer.addEventListener('mouseleave', function(event) {
      let center = document.getElementsByClassName('slot')[1];

      center.classList.add('center');
    });
  }
  imagesErrorHanlder(e) {
    e.target.src = '/images/no_image_available.png';
  }
  render() {
    const images = this.props.images ||
     [
       '/images/no_image_available.png',
       '/images/no_image_available.png',
       '/images/no_image_available.png',
     ];

    return (
      <div className="display-image">
        <div className="slot">
          <img onError={this.imagesErrorHanlder} src={images[1]}/>
        </div>
        <div className="slot center">
          <img onError={this.imagesErrorHanlder} src={images[0]}/>
        </div>
        <div className="slot">
          <img onError={this.imagesErrorHanlder} src={images[2]}/>
        </div>
      </div>
    );
  }
}

export default ImageDisplay;
