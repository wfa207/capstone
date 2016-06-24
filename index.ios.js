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

class capstone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logging: false
    }
  }

  renderScene(route, navigator) {
    var Component = route.component;
    return <Component
      navigator={navigator}
      {...route.passProps}
    />
  }

  render() {
    return (
      <Navigator
        style={styles.topBar}
        initialRoute={{
          component: Button
        }}
        renderScene={ this.renderScene }
      />
    );
  }
}

AppRegistry.registerComponent('capstone', () => capstone);
