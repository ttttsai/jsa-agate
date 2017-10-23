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
    const center = {lat: 22.528113, lng: 113.946343};
    const zoom = this.props.mapType === 'detail' ? 15 : 14;
    const map = new google.maps.Map(
      document.getElementsByClassName('google-map-component')[0], {
        center: center,
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

    this.setState({map: map, mapCenter: center});
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
  setCenter(center) {
    if (this.props.mapType === 'detail') {
      this.state.map.setCenter(center);
      this.setState({mapCenter: center});
    }
  }
  addMarkerListener(marker, value) {
    let that = this;
    let infowindow = new google.maps.InfoWindow({content: value.name});

    marker.addListener('mouseover', function() {
      infowindow.open(that.state.map, marker);
    });
    marker.addListener('mouseout', function() {
      infowindow.close();
    });
    marker.addListener('click', function(evt) {
      let infoDetailWindow = new google.maps.InfoWindow({content: value.name});

      that.state.map.setZoom(15);
      that.state.map.panTo(marker.getPosition());
      infoDetailWindow.addListener('closeclick', function(event) {
        that.state.map.panTo(that.state.mapCenter);
        that.state.map.setZoom(14);
      });
      infoDetailWindow.open(that.state.map, marker);
    });
  }
  createMarker(value) {
    const that = this;
    let marker = new google.maps.Marker({
      position: {lat: value.latitude, lng: value.longitude},
      map: that.state.map,
      animation: google.maps.Animation.DROP,
    });

    if (that.props.mapType !== 'detail') {
      that.addMarkerListener(marker, value);
    }
    return marker;
  }
  makeMarkers(businesses) {
    if (businesses && businesses.length > 0 && this.state.map) {
      this.clearMarkers();
      this.setCenter({
        lat: businesses[0].latitude,
        lng: businesses[0].longitude,
      });

      this.setState({markers: businesses.map(this.createMarker.bind(this))});
    }
  }
  render() {
    this.makeMarkers();
    return <div className="google-map-component" ></div>;
  }
}

export default HomePageMap;
