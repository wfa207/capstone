'use strict'

import React, { Component } from 'react';
import {
  AsyncStorage,
  Text,
  Navigator,
  TouchableHighlight,
  View
} from 'react-native';
import styles from './styles';
import {getCurrentLocation} from '../utils/geolocation';
import {SERVER_ROUTE} from '../server/env/development';

class HomeButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logging: false,
      activities: []
    }
  }

  saveLocation(position) {
    return AsyncStorage.getItem('locations')
    .then(locations => {
      locations = JSON.parse(locations);

      let date = new Date(position.timestamp);
      let hours = date.getHours();
      let minutes = "0" + date.getMinutes();
      let formattedTime = ((hours == 0) ? 12 : (hours % 12)) + ':' +
                          minutes.substr(-2) + ((hours <= 12) ? "AM" : "PM");

      let latitude = position.coords.latitude, longitude = position.coords.longitude;
      let lat = (latitude >= 0) ? (Math.floor(latitude*100)/100).toString() + "N" :
                                 (Math.abs(Math.floor(latitude*100)/100)).toString() + "S";
      let long = (longitude >= 0) ? (Math.floor(longitude*100)/100).toString() + "E" :
                                 (Math.abs(Math.floor(longitude*100)/100)).toString() + "W";

      let name = formattedTime + " | " + lat + ", " + long;
      let id = 1;
      while (locations[id-1]) id++;
      
      locations.push({
        id: id,
        name: name,
        coordinates: [latitude, longitude]
      });
      return AsyncStorage.setItem('locations', JSON.stringify(locations));
    })
    .then(() => {
      return AsyncStorage.getItem('locations')
    })
    .then(locations => {
      locations = JSON.parse(locations);
      console.log("All locations after adding the new position:")
      locations.forEach(location => {
        console.log(location)
      });
    })
  }

  startLogging() {
    var me = this;
    getCurrentLocation(position => {
      // Code goes before state switch
      console.log("Position that will be saved:", position)
      this.saveLocation(position)
      .then(function() {
        me.setState({logging: true});
      })
      .catch(console.error);
    });
  }

  stopLogging() {
    var me = this;
    getCurrentLocation(position => {
      // Code goes before state switch
      console.log("Position that will be saved:", position)
      this.saveLocation(position)
      .then(function() {
        me.setState({logging: false});
      })
      .catch(console.error);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          navigator={navigator}
          style={this.state.logging ? styles.stopButton : styles.logButton}
          onPress={() => {
            if (!this.state.logging) this.startLogging();
            else this.stopLogging();
          }}
          underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>
              {(this.state.logging ? 'Stop' : 'Start') + '\n'}logging
            </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

module.exports = HomeButton;
