/* global google*/
import React from 'react';
import './style.scss';

class HomePageMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [{lat: 22.528640199999998, lng: 113.94},
        {lat: 22.53, lng: 113.93874219999998},
        {lat: 22.56, lng: 113.95555555555},
        {lat: 22.55, lng: 114.000001}],
    };
  }
  componentDidMount() {
    window.initMap = this.initMap.bind(this);
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAHP4cn0A4W4VIudAlmHmpAakBvbmcR5fY&callback=initMap');
  }
  initMap() {
    let center = {lat: 22.528640199999998, lng: 113.93874219999998};
    let mapProp = {
      center: center,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    let map = new google.maps.Map(
      document.getElementsByClassName('home-page-map')[0], mapProp);
    this.state.businesses.forEach(function(value) {
      let marker = new google.maps.Marker({
        position: value,
        map: map,
      });
    });
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
