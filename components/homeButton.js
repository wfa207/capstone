'use strict'

import React, { Component } from 'react';
import {
  TextInput,
  AsyncStorage,
  Text,
  Navigator,
  TouchableHighlight,
  AlertIOS,
  View,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import {getCurrentLocation} from '../utils';
import {SERVER_ROUTE} from '../server/env/development';

class HomeButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logging: false,
      collection: null
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
  }

  _type(str) {
    this.setState({
      searchString: str,
      collection: this.state.locationNamesArray.filter(c => c.substr(0, str.length) === str)
    });
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
    var locationNamesArray = this.state.locations.map((location) => {return location.name });
    this.setState({
      locationNamesArray: locationNamesArray,
    })
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
              ref="input"
              style={styles.autocomplete}
              onChangeText={(value) => { this.setLocationNameState(value); this._type(value); }}
              onSubmitEditing={() => this.saveLocation(this.state.locations, this.state.position, this.state.locationName)}

              placeholder='Enter Location Here'
            />
            {this.state.collection && this.state.collection.length && this.state.collection.map(value => (
                <TouchableOpacity onPress={() => this.refs.input.setNativeProps({ text: value })}>
                  <Text>{value}</Text>
                </TouchableOpacity>
            )
          )}
          </View>
        )}
      </View>
    )
  }
}

module.exports = HomeButton;

