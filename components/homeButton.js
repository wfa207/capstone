'use strict'

var AutoComplete = require('react-native-autocomplete');

import React, { Component } from 'react';
import {
  TextInput,
  AsyncStorage,
  Text,
  Navigator,
  TouchableHighlight,
  AlertIOS,
  View,
  ListView
} from 'react-native';
import styles from './styles';
import {getCurrentLocation} from '../utils';
import {SERVER_ROUTE} from '../server/env/development';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class HomeButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logging: false
    }
  }

  onTyping(text) {
    var locations = this.state.locations.filter(function (location) {
      return location.name.toLowerCase().startsWith(text.toLowerCase())
    }).map(function (location) {
      return location.name;
    });

    this.setState({
      data: locations
    });
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

  saveLocation(locations, position, inputName) {
      this.setState({ inputShow: false });
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

  startStopLog() {
    this.setState({logging: !this.state.logging});
    if (this.state.logging) this.setState({ inputShow: true });
    getCurrentLocation(position => {
      this.setState({ position: position });
    });
    console.log('STATE2', this.state);
  }

  _renderLocation = (location) => {
    return (
      <View>
        <Text>{location.name}</Text>
      </View>
    );
  }

  setLocationNameState(text) {
    this.setState({locationName: text});
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
              onTyping={(value) => this.onTyping(value)}
              style={styles.autocomplete}
              onTyping={this.onTyping}
              onChangeText={(value) => this.setLocationNameState(value)}
              onSubmitEditing={() => this.saveLocation(this.state.locations, this.state.position, this.state.locationName)}

              placeholder='Enter Location Here'
            />
            <ListView
              dataSource={ds.cloneWithRows(this.state.data)}
              renderRow={this.renderLocation}
            />
          </View>
        )}
      </View>
    )
  }
}

module.exports = HomeButton;

