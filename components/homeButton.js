'use strict'

import React, { Component } from 'react';
import {
  AsyncStorage,
  Text,
  Image,
  Navigator,
  TouchableHighlight,
  AlertIOS,
  View
} from 'react-native';
import styles from './styles';
import {
  getCurrentLocation,
  getAddress,
  initialDbFetch,
  getDbData,
  addLocation,
  addUpdateTime,
  nearbySearch,
  formatToTime
} from '../utils';
import {seed} from '../database';
import {SERVER_ROUTE} from '../server/env/development';

class HomeButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logging: false,
    }
  }

  componentWillMount() {
    seed()
    .then(() => {
      getDbData()
      .then(locations => {
        this.setState({
          locations: locations
        });
      })
    })
    .catch(alert);
  }

  findExistingNearbyLoc = (currPosition, locations) => {
    return locations.filter(location => {
      return (Math.abs(location.coords.latitude - currPosition.coords.latitude) <= 0.0003 && 
        Math.abs(location.coords.longitude - currPosition.coords.longitude) <= 0.0003
      )
    });
  }

  loggingToggle = () => {
    this.setState({logging: !this.state.logging});
  }

  processLocationInput = (position, inputName) => {
    let logTime = new Date(position.timestamp);
    let existNearbyLoc = this.findExistingNearbyLoc(position, this.state.locations)
    let name = inputName;

    if (!existNearbyLoc.length) {
      getAddress(position)
      .then(results => {
        let addressObj = results[0];
        let addressArr = addressObj.formatted_address.split(', ');
        let [street, city, stateZip, country] = addressArr;
        let stateZipArr = stateZip.split(' ');
        let state = stateZipArr[0];
        let ZIP = stateZipArr[1];

        if (!name) {
          let dateObj = {
            hours: logTime.getHours(),
            minutes: logTime.getMinutes()
          }
          let formattedTime = formatToTime(dateObj);
          name = formattedTime + ' | ' + street;
        }

        addLocation({
          name: name,
          coords: position.coords,
          street: street,
          city: city,
          state: state,
          ZIP: ZIP,
          country: country
        })
        .then(location => {
          addUpdateTime(location, true, position.timestamp)
          .then(this.loggingToggle)
        });
      })
      .catch(alert);

    } else {
      addUpdateTime(existNearbyLoc[0], true, position.timestamp)
      .then(this.loggingToggle)
      .catch(alert);
    }

  }

  saveLocation = position => {

    if (!this.state.logging) {
      AlertIOS.prompt('Location Name', 'Please enter a name for this location', [{
          text: 'Not Now',
          onPress: () => this.processLocationInput(position, null),
          style: 'destructive'
        }, {
          text: 'Enter',
          onPress: text => this.processLocationInput(position, text),
          style: 'default'
        }]);
    } else {
      addUpdateTime(null, false, position.timestamp)
      .then(() => {
        getDbData()
        .then(locations => {
          this.setState({
            logging: !this.state.logging,
            locations: locations
          });
        });
      })
      .catch(alert);
    }
  }

  startStopLog() {
    getCurrentLocation(position => {
      this.saveLocation(position);
    })
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
