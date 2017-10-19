import React from 'react';
import './style.scss';
import * as imagesJson from './imagesForTest.json';

const imagesList = imagesJson.imagesUrl;

class ImageDisplay extends React.Component {
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
  render() {
    return (
      <div className="display-image">
        <div className="slot">
          <img src={imagesList[0]}/>
        </div>
        <div className="slot center">
          <img src={imagesList[1]}/>
        </div>
        <div className="slot">
          <img src={imagesList[2]}/>
        </div>
      </div>
    );
  }
}

export default ImageDisplay;
