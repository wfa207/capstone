'use strict';

import React, { Component } from 'react';
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
      markers: {
        latlng: [40.7034, -74.0132],
        title: "Home",
        description: "FullStack Academy"
      }
    };
  }

  onRegionChange(region) {
    console.log(this.state.region);
    this.setState({ region: region });
  }

  render() {
    return (
      <MapView
        style={styles.map}
        region={this.state.region}
        onRegionChange={() => this.onRegionChange.bind(this)}
        markers={this.state.markers.map(marker => (
          <MapView.Marker
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
      />
    );
  }
};

module.exports = Map;
