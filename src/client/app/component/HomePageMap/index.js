/* global google*/
import React from 'react';
import './style.scss';

class HomePageMap extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    window.initMap = this.initMap.bind(this);
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAHP4cn0A4W4VIudAlmHmpAakBvbmcR5fY&callback=initMap');
  }
  initMap() {
    let center = {lat: 22.2222, lng: 114};
    let mapProp = {
      center: center,
      zoom: 9,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    let map = new google.maps.Map(
      document.getElementsByClassName('home-page-map')[0], mapProp);
    if (this.props.businesses) {
      this.props.businesses.forEach(function(value) {
        let marker = new google.maps.Marker({
          position: {lat: value.latitude, lng: value.longitude},
          map: map,
        });
      });
    }
  }
  render() {
    return <div className="home-page-map" ></div>;
  }
}

function loadJS(src) {
  let ref = window.document.getElementsByTagName('script')[0];
  let script = window.document.createElement('script');
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}

export default HomePageMap;
