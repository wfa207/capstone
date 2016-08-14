'use strict';

import React, { Component } from 'react';
import {
  AsyncStorage,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from '../styles';
import { SERVER_ROUTE } from '../../../server/env/development';
import { getCurrentLocation, getDbData } from '../../../utils';

let centerIcon = require('../../../resources/target.png');

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markers: []
    };
  }

  componentWillMount = () => {
    getCurrentLocation(position => {
      this.setState({region: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }});
    });
    this.mapAllLocations();
  }

  markerGenerator(locations) {
    var markers = locations.map(function(location) {
      var marker = {
        latlng: { latitude: location.coords.latitude, longitude: location.coords.longitude},
        title: location.name
      };
      return marker;
    });
    return markers;
  }

  componentWillReceiveProps = () => {
    this.mapAllLocations();
  }

  mapAllLocations = () => {
    return getDbData()
    .then((locations) => {
      var markers = this.markerGenerator(locations);
      this.setState({markers: markers});
      return locations;
    })
    .catch(alert);
  }

  onRegionChange = region => {
    this.setState({region: region});
  }

  centerOnUser = () => {
    getCurrentLocation(position => {
      this.refs.map.refs.node.animateToCoordinate(position.coords, 1000);
    });
  }

  render() {
    return (
      <View style={styles.banner}>
      <MapView.Animated
        ref="map"
        showsUserLocation={true}
        followUserLocation={true}
        style={styles.map}
        region={this.state.region}
        onRegionChange={this.onRegionChange}
      >
        {this.state.markers.map((marker, i) => (
          <MapView.Marker
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
            key={i}
          />
        ))}
      </MapView.Animated>
      <TouchableHighlight
      underlayColor='rgba(35, 35, 35, 0.3)'
      style={styles.mapButton}
      onPress={this.centerOnUser}
      >
        <Image
        style={{tintColor: '#48BBEC'}}
        source={centerIcon}
        />
      </TouchableHighlight>
      </View>
    );
  }
}

export default Map;