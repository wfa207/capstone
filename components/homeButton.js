'use strict'

import React, { Component } from 'react';
import {
  AsyncStorage,
  Text,
  Navigator,
  TouchableHighlight,
  AlertIOS,
  View
} from 'react-native';
import styles from './styles';
import {getCurrentLocation} from '../utils';
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
    var me = this;
    me.setState({logging: !me.state.logging});
    return AsyncStorage.getItem('locations')
    .then(locations => {

      function getLocationName(inputName) {
        locations = JSON.parse(locations);
        let latitude = position.coords.latitude, longitude = position.coords.longitude;
        let id = (locations ? locations.length : 0) + 1;
        var name = inputName;

        if (!name) {
          let date = new Date(position.timestamp);
          let hours = date.getHours();
          let minutes = "0" + date.getMinutes();
          let formattedTime = ((hours == 0) ? 12 : (hours % 12)) + ':' +
          minutes.substr(-2) + (hours <= 12 ? "AM" : "PM");

          let lat = (Math.abs(Math.floor(latitude*100)/100)).toString() + (latitude >= 0 ? "N" : "S");
          let long = (Math.abs(Math.floor(longitude*100)/100)).toString() + (longitude >= 0 ? "E" : "W");

          name = formattedTime + " | " + lat + ", " + long;
        }

        locations.push({
          id: id,
          name: name,
          coordinates: [latitude, longitude]
        });
        return AsyncStorage.setItem('locations', JSON.stringify(locations))
        .catch(console.error);
      }

      AlertIOS.prompt('Location Name', 'Please enter a name for this location', [
        {
          text: 'Not Now',
          onPress: () => getLocationName(),
          style: 'destructive'
        }, {
          text: 'Enter',
          onPress: text => getLocationName(text),
          style: 'default'
        }
      ]);
    })
    .catch(console.error);
}

  startStopLog() {
    getCurrentLocation(position => {
      // Code goes before state switch
      this.saveLocation(position);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          navigator={navigator}
          style={this.state.logging ? styles.stopButton : styles.logButton}
          onPress={() => this.startStopLog()}
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
