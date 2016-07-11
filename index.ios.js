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
import db from './database';

class capstone extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <TabBar/>
  }
}

AppRegistry.registerComponent('capstone', () => capstone);
