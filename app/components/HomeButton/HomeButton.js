'use strict';

import React, { Component } from 'react';
import {
  AsyncStorage,
  Text,
  Image,
  Navigator,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  AlertIOS,
  View
} from 'react-native';
import styles from '../styles';
import {
  getCurrentLocation,
  getAddress,
  initialDbFetch,
  getDbData,
  addLocation,
  addUpdateTime,
  nearbySearch,
  formatToTime
} from '../../../utils';
import {seed} from '../../../database';
import {SERVER_ROUTE} from '../../../server/env/development';

console.disableYellowBox = true;

class HomeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logging: false,
      collection: null,
      inputShow: false
    };
  }

  componentWillMount() {
    seed()
    .then(() => {
      getDbData()
      .then(locations => {
        this.setState({
          locations: locations
        });
      });
    })
    .catch(alert);
  }

  _type = (str) => {
    var locationNames = this.state.locations.map(location => location.name);
    var collection = locationNames.filter(name => name.substr(0, str.length) === str).slice(0, 5);
    this.setState({
      searchString: str,
      collection: collection
    });
  }

  setLocationNameState(text) {
    this.setState({locationName: text});
  }

  findExistingNearbyLoc = (currPosition, locations) => {
    return locations.filter(location => {
      return (Math.abs(location.coords.latitude - currPosition.coords.latitude) <= 0.0003 && 
        Math.abs(location.coords.longitude - currPosition.coords.longitude) <= 0.0003
      );
    });
  }

  stateToggle = () => {
    this.setState({
      logging: !this.state.logging,
      inputShow: false
    });
  }

  processLocationInput = (existNearbyLoc, inputName) => {
    let position = this.state.position;
    let logTime = new Date(position.timestamp);
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
          };
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
          .then(this.stateToggle);
        });
      })
      .catch(alert);

    } else {
      addUpdateTime(existNearbyLoc[0], true, position.timestamp)
        .then(this.stateToggle)
        .catch(alert);
    }
  }

  startStopLog() {
    if (!this.state.logging) {
      getCurrentLocation(position => {
        this.setState({position: position});
        let existNearbyLoc = this.findExistingNearbyLoc(position, this.state.locations);
        if (existNearbyLoc.length) {
          AlertIOS.alert('Location already exists', 'Location will be logged as ' + existNearbyLoc[0].name + '.', () => {
            this.processLocationInput(existNearbyLoc);
          });
        } else {
          this.setState({
            inputShow: true,
            position: position
          });
        }
      });
    } else {
      if (!this.state.inputShow) {
        getCurrentLocation(position => {
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
        });
      }
    }
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
            <Text style={[styles.locationInputHeader, {fontWeight: '600'}]}>Location Name</Text>
            <TextInput
              ref="input"
              style={styles.autocomplete}
              onChangeText={(value) => { this.setLocationNameState(value); this._type(value); }}
              onSubmitEditing={() => this.processLocationInput([], this.state.locationName)}
              placeholder='Enter Location Name Here'
            />
            {this.state.collection && !!this.state.collection.length && this.state.collection.map((value, idx) => (
                <TouchableOpacity
                  style={styles.autocompleteList} 
                  key={idx + 1}
                  onPress={() => { this.refs.input.setNativeProps({ text: value ? value : '' }); this.setLocationNameState(value); }}>
                  <Text style={styles.autocompleteText}>{value}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        )}
      </View>
    );
  }
}

export default HomeButton;