'use strict'

import React, { Component } from 'react';
import {
  AsyncStorage,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from './styles';
import { SERVER_ROUTE } from '../server/env/development';
import { getCurrentLocation } from '../utils';

var centerIcon = require('../resources/target.png');

var Map = React.createClass({
  getInitialState: function() {
    return {
      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markers: []
    };
  },

  componentDidMount: function() {
    getCurrentLocation(position => {
      this.setState({region: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }});
    });
    this.fetchAllLocations();
  },

  fetchAllLocations: function() {
    AsyncStorage.getItem('locations')
    .then((locations) => {
      locations = JSON.parse(locations);
      var markers = locations.map(function(location) {
        var marker = {
          latlng: { latitude: location.coordinates[0], longitude: location.coordinates[1]},
          title: location.name,
          description: location.description
        };
        return marker;
      });
      this.setState({markers: markers});
    })
  },

  onRegionChange: function(region) {
    this.setState({region: region});
  },

  centerOnUser: function() {
    getCurrentLocation(position => {
      this.refs.map.refs.node.animateToCoordinate(position.coords, 1000);
    });
  },

  render: function() {
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
});

module.exports = Map;
