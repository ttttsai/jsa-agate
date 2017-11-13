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
    let mapZoom = 13;

    switch (props.mapType) {
    case 'detail':
      mapZoom = 15;
      break;
    case 'create':
      mapZoom = 12;
      break;
    }
    this.state = {
      map: undefined,
      markers: [],
      mapZoom: mapZoom,
      markerForCreatePage: undefined,
    };
  }
  componentDidMount() {
    window.initMap = this.initMap.bind(this);
    loadJS('http://maps.google.cn/maps/api/js?key=AIzaSyAHP4cn0A4W4VIudAlmHmpAakBvbmcR5fY&callback=initMap&language=en');
  }
  getRealAddress(position, callback) {
    const geocoder = new google.maps.Geocoder;
    const latlng = {lat: position.lat(), lng: position.lng()};

    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK' && results[0]) {
        callback(position, results[0].formatted_address);
      }
      callback(position);
    });
  }

  addMapEventListner() {
    const map = this.state.map;
    const that = this;

    map.addListener('click', function(e) {
      that.getRealAddress(e.latLng, that.props.clickHandlerForCreate);

      that.removePreviousMarker();
      that.placeMarker(e.latLng);
    });
  }
  getRealLocationOfMap() {
    const that = this;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        that.state.map.setCenter(pos);
        that.setState({mapCenter: pos});
      });
    }
  }
  removePreviousMarker() {
    const {markerForCreatePage} = this.state;

    if (markerForCreatePage) {
      markerForCreatePage.setMap(null);
    }
  }
  placeMarker(position) {
    const map = this.state.map;
    const marker = new google.maps.Marker({
      position: position,
      map: map,
    });

    this.setState({markerForCreatePage: marker});
  }
  initMap() {
    const center = {lat: 22.528113, lng: 113.946343};
    const map = new google.maps.Map(
      document.getElementsByClassName('google-map-component')[0], {
        center: center,
        zoom: this.state.mapZoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        fullscreenControl: false,
        zoomControl: true,
        scaleControl: true,
      });

    this.setState({map: map, mapCenter: center});
    if (this.props.mapType === 'create') {
      this.addMapEventListner();
    } else if (this.props.mapType === 'home') {
      this.getRealLocationOfMap();
      this.makeMarkers(this.props.businesses);
    } else {
      this.makeMarkers(this.props.businesses);
    }
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

    marker.addListener('click', function(evt) {
      let contentStr = '<div class="info-window">' + 
        '<div class="info-window-left">' +
        '<h3>' + value.name + '</h3>' +
        '<p>Rating: ' + value.rating.toFixed(1) + '</p>' +
        '<p>Address: ' + value.address + '</p>' +
        '<p>Tel: ' + value.phone + '</p>' +
        '</div>' +
        '<div class="info-window-right">' +
        '<img src="' + value.images[0] + '" />' +
        '</div>' +
        '</div>';
      let infoDetailWindow = new google.maps.InfoWindow({content: contentStr});

      that.state.map.setZoom(15);
      that.state.map.panTo(marker.getPosition());
      infoDetailWindow.addListener('closeclick', function(event) {
        that.state.map.panTo(that.state.mapCenter);
        that.state.map.setZoom(that.state.mapZoom);
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
    if (businesses && this.state.map) {
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
