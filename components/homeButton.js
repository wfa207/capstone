'use strict'

import React, { Component } from 'react';
import {
  TextInput,
  AsyncStorage,
  Text,
  Image,
  Navigator,
  TouchableHighlight,
  AlertIOS,
  View,
  TouchableOpacity
} from 'react-native';
import styles from './styles';
import {getCurrentLocation, fetchTimes, fetchAndStoreData, revGeocode, nearbySearch, getPhotoURL, localFetch, localStore} from '../utils';
import {SERVER_ROUTE} from '../server/env/development';

var time = {};
var newLocation = {};
console.disableYellowBox = true;

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
      collection: this.state.locationNamesArray.filter(c => c.substr(0, str.length) === str).slice(0,5)
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

      // let photoURL;
      //   nearbySearch(latitude, longitude, queryName)
        // .then(locations => {
        //   return getPhotoURL(locations);
        // })
        // .then(_photoURL => {
        //   photoURL = _photoURL;
        //   return localFetch('photos')
        // })
        // .then(photos => {
        //   if (!photos) photos = [];
        //   photos.push({id: id, url: photoURL});
        //   return localStore('photos', photos);
        // })
        // .catch(console.error);

        newLocation = {
          id: id,
          name: name,
          coordinates: [latitude, longitude],
          city: 'New York',
          state: 'NY',
          country: 'United States',
          visits: 1,
          timeSpent: 0,
        };
        locations.push(newLocation);

        time.left = (new Date()).toString();
        time.locationId = newLocation.id;
        let times;
        return AsyncStorage.setItem('locations', JSON.stringify(locations))
        .then(() => {
          // store in database
          // return fetchAndStoreData("/api/users/1/locations", JSON.stringify(locations));
          return fetchTimes();
        })
        .then(times => {
          time.id = times.length + 1;
          time.dayId = 1;
          time.userId = 1;
          times.push(time);
          return times;
        })
        .then(_times => {
          times = _times;
          return AsyncStorage.setItem('times', JSON.stringify(times));
        })
        .then(() => {
          return fetchAndStoreData("/api/users/1/times", JSON.stringify(times));
        })
        .catch(console.error);

      // locations.push({
      //   id: id,
      //   name: name,
      //   coordinates: [latitude, longitude],
      // });

      // return AsyncStorage.setItem('locations', JSON.stringify(locations))
      // .catch(console.error);
  }

  startStopLog() {
    this.setState({logging: !this.state.logging});
    if (this.state.logging) this.setState({ inputShow: true });
    getCurrentLocation(position => {
      this.setState({ position: position });
    });
    var locations = this.state.locations;
    var arr = locations ? locations.map((location) => {return location.name }) : [''];
    var locationNamesArray = [];
    for (var i = 0; i < arr.length; i++) {
      var current = arr[i];
      if (locationNamesArray.indexOf(current) < 0) locationNamesArray.push(current);
    }
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
            <Text style={[styles.locationInputHeader, {fontWeight: '600'}]}>Location Name</Text>
            <TextInput
              ref="input"
              style={styles.autocomplete}
              onChangeText={(value) => { this.setLocationNameState(value); this._type(value); }}
              onSubmitEditing={() => this.saveLocation(this.state.locations, this.state.position, this.state.locationName)}

              placeholder='Enter Location Here'
            />
            {this.state.collection && !!this.state.collection.length && this.state.collection.map((value, idx) => (
                <TouchableOpacity
                  style={styles.autocompleteList} 
                  key={idx+1} 
                  onPress={() => { this.refs.input.setNativeProps({ text: value ? value : '' }); this.setLocationNameState(value); }}>
                  <Text style={styles.autocompleteText}>{value}</Text>
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

