'use strict'

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */
//

import React, { Component } from 'react';
import {
  AppRegistry,
  View
} from 'react-native';
import TabBar from './components/tabBar';
import styles from './components/styles';
import {SERVER_ROUTE} from './server/env/development';
import {
  initialFetchAndStoreData
} from './utils';

class capstone extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    initialFetchAndStoreData("/api/users/1/locations", 'locations');
    initialFetchAndStoreData("/api/users/1/trips", 'activities');
  }

  render() {
    return (
      <TabBar/>
    );
  }
}

AppRegistry.registerComponent('capstone', () => capstone);
