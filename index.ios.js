'use strict'

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */
//

import React, { Component } from 'react';
import {
  AsyncStorage,
  AppRegistry,
  View
} from 'react-native';
import TabBar from './components/tabBar';
import styles from './components/styles';
import {SERVER_ROUTE} from './server/env/development';

class capstone extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.storeData();
  }

  storeData() {
    fetch(SERVER_ROUTE + "/api/users/1/locations")
    .then(res => {
      return res.json();
    })
    .then(locations => {
      AsyncStorage.setItem('locations', JSON.stringify(locations));
    });
  }

  render() {
    return (
      <TabBar/>
    );
  }
}

AppRegistry.registerComponent('capstone', () => capstone);
