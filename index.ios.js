/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  TouchableHighlight,
  View
} from 'react-native';
import styles from './styles';
import button from './homeButton';

class capstone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logging: false
    }
  }
  render() {
    return (
      <NavigatorIOS
        style={styles.topBar}
        initialRoute={{
          title: 'DownTime',
          component: button
      }}/>
    );
  }
}

AppRegistry.registerComponent('capstone', () => capstone);
