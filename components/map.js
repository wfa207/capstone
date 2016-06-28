'use strict';

import React, { Component } from 'react';
import {
  View,
  TouchableHighlight
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from './styles';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 40.7034,
        longitude: -74.0132,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markers: [{
        latlng: { latitude: 40.7034, longitude: -74.0132},
        title: "Home",
        description: "FullStack Academy",
      }]
    };
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  onRegionChange(region) {
    this.setState({region});
    console.log(this.state);
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <MapView.Animated
        ref="map"
        showsUserLocation={true}
        followsUserLocation={true}
        showsPointsOfInterest={true}
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
      </View>
    );
  }
};

module.exports = Map;
