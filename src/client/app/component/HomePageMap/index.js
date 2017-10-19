/* global google*/
import React from 'react';
import './style.scss';

function loadJS(src) {
  let ref = window.document.getElementsByTagName('script')[0];
  let script = window.document.createElement('script');

  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
}

class HomePageMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {map: undefined, markers: []};
  }
  componentDidMount() {
    window.initMap = this.initMap.bind(this);
    loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyAHP4cn0A4W4VIudAlmHmpAakBvbmcR5fY&callback=initMap');
  }
  initMap() {
    const center = {lat: 22.2222, lng: 114};
    const mapProp = {
      center: center,
      zoom: 9,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    const map = new google.maps.Map(
      document.getElementsByClassName('google-map-component')[0], mapProp);

    this.setState({map: map});
    this.makeMarkers(this.props.businesses);
  }
  componentWillReceiveProps(nextProps) {
    this.makeMarkers(nextProps.businesses);
  }
  clearMarkers() {
    if (this.state.markers && this.state.markers.length > 0) {
      this.state.markers.forEach(function(item) {
        item.setMap(null);
      });
      this.setState({markers: []});
    }
  }
  makeMarkers(businesses) {
    const that = this;

    if (businesses && this.state.map) {
      this.clearMarkers();

      const markers = businesses.map(function(value, index) {
        return new google.maps.Marker({
          position: {lat: value.latitude, lng: value.longitude},
          map: that.state.map,
        });
      });

      this.setState({markers: markers});
    }
  }
  render() {
    this.makeMarkers();
    return <div className="google-map-component" ></div>;
  }
}

export default HomePageMap;
