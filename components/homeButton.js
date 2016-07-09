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
import {getCurrentLocation, fetchTimes, fetchAndStoreData, revGeocode, nearbySearch, getPhotoURL, localFetch, localStore} from '../utils';
import {SERVER_ROUTE} from '../server/env/development';

var time = {};
var newLocation = {};

class HomeButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logging: false,
    }
  }

  saveLocation(position) {
    var me = this;
    me.setState({logging: !me.state.logging});

    return AsyncStorage.getItem('locations')
    .then(locations => {

      function getLocation(inputName) {
        locations = JSON.parse(locations);
        let latitude = position.coords.latitude, longitude = position.coords.longitude;
        let id = 1;
        let locationWithIdExists = locations.find(location => {
          return location.id === id; 
        });
        while (locationWithIdExists) {
          id++;
          locationWithIdExists = locations.find(location => {
            return location.id === id; 
          });
        }
        var name = inputName;
        var queryName = inputName;

        if (!name) {
          let date = new Date(position.timestamp);
          let hours = date.getHours();
          let minutes = "0" + date.getMinutes();
          let formattedTime = ((hours == 0) ? 12 : (hours % 12)) + ':' +
          minutes.substr(-2) + (hours <= 12 ? "AM" : "PM");

          let lat = (Math.abs(Math.floor(latitude*100)/100)).toString() + (latitude >= 0 ? "N" : "S");
          let long = (Math.abs(Math.floor(longitude*100)/100)).toString() + (longitude >= 0 ? "E" : "W");

          name = formattedTime + " | " + lat + ", " + long;
          queryName = undefined;
        }

        let photoURL;
        nearbySearch(latitude, longitude, queryName)
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
        .catch(console.error);


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
      }
      if (this.state.logging)
        time.arrived = (new Date()).toString();
      else {
        AlertIOS.prompt('Location Name', 'Please enter a name for this location', [
          {
            text: 'Not Now',
            onPress: () => getLocation(),
            style: 'destructive'
          }, {
            text: 'Enter',
            onPress: text => getLocation(text),
            style: 'default'
          }
        ]);
      }
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
