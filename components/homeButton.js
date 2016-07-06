'use strict'

var Autocomplete = require('react-native-autocomplete');

import React, { Component } from 'react';
import {
  TextInput,
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
      logging: false
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('locations')
    .then(locations => {
      locations = JSON.parse(locations);
      this.setState({
        locations: locations
      });
    });
    console.log('STATE', this.state);
  }

  getLocationName(locations, position, inputName) {
      // locations = JSON.parse(locations);
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

  // getLocations() {
  //   // var me = this;
  //   this.setState({logging: !this.state.logging});
  //   if (this.state.logging) this.setState({ inputShow: true });
  //   return AsyncStorage.getItem('locations')
  //   .then(locations => {
  //     locations = JSON.parse(locations);
  //     this.setState({
  //       locations: locations
  //     });
  //     // function getLocationName(locations, inputName) {
  //     //   locations = JSON.parse(locations);
  //     //   let latitude = position.coords.latitude, longitude = position.coords.longitude;
  //     //   let id = (locations ? locations.length : 0) + 1;
  //     //   var name = inputName;
  //     //
  //     //   if (!name) {
  //     //     let date = new Date(position.timestamp);
  //     //     let hours = date.getHours();
  //     //     let minutes = "0" + date.getMinutes();
  //     //     let formattedTime = ((hours == 0) ? 12 : (hours % 12)) + ':' +
  //     //     minutes.substr(-2) + (hours <= 12 ? "AM" : "PM");
  //     //
  //     //     let lat = (Math.abs(Math.floor(latitude*100)/100)).toString() + (latitude >= 0 ? "N" : "S");
  //     //     let long = (Math.abs(Math.floor(longitude*100)/100)).toString() + (longitude >= 0 ? "E" : "W");
  //     //
  //     //     name = formattedTime + " | " + lat + ", " + long;
  //     //   }
  //     //
  //     //   locations.push({
  //     //     id: id,
  //     //     name: name,
  //     //     coordinates: [latitude, longitude]
  //     //   });
  //     //   return AsyncStorage.setItem('locations', JSON.stringify(locations))
  //     //   .catch(console.error);
  //     // }
  //
  //     // if (this.state.logging) {
  //     //   AlertIOS.prompt('Location Name', 'Please enter a name for this location', [
  //     //     {
  //     //       text: 'Not Now',
  //     //       onPress: () => getLocationName(),
  //     //       style: 'destructive'
  //     //     }, {
  //     //       text: 'Enter',
  //     //       onPress: text => getLocationName(text),
  //     //       style: 'default'
  //     //     }
  //     //   ]);
  //     // }
  //   })
  //   .catch(console.error);
  // }

  startStopLog() {
    getCurrentLocation(position => {
      this.setState({ position: position });
    });
    this.setState({logging: !this.state.logging});
    if (this.state.logging) this.setState({ inputShow: true });
    console.log('STATE2', this.state);
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
        {this.state.inputShow && (
          <View style={styles.modal}>
            <Text>Enter location name</Text>
            <TextInput
              style={styles.autocomplete}
              onTyping={this.onTyping}
              onSubmitEditing={(text) => {
                this.getLocationName(this.state.locations, this.state.position, text);
                this.state.inputShow = false;
              }}
            />
          </View>
        )}
      </View>
    )
  }
}

module.exports = HomeButton;
