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
  Navigator,
  TouchableHighlight,
  View
} from 'react-native';
import styles from './styles';
import Button from './homeButton';
import Map from './maps';

class capstone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logging: false
    }
  }

  renderScene(route, navigator) {
      if (route.name === 'Home Button') {
        return <Button
          navigator={navigator}
          route={route}
        />
      }
  }

  render() {
    return (
        <Navigator
          style={styles.topBar}
          initialRoute={{
            name: 'Home Button',
            title: 'Down Time'
          }}
          renderScene={ this.renderScene }
        />
    );
  }
}

AppRegistry.registerComponent('capstone', () => capstone);
