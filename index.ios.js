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
  StyleSheet,
  Text,
  Navigator,
  View
} from 'react-native';
import styles from './components/styles';
import TabBar from './components/tabBar';

class capstone extends Component {
  constructor(props) {
    super(props);
  }

  configureScene(route, routeStack) {
    var sceneSwitch = Navigator.SceneConfigs;
    console.log(route);
    switch(route.name) {
      case 'Charts':
        return sceneSwitch.HorizontalSwipeJump;
      break;
      default:
      break;
    }
  }

  renderScene(route, navigator) {
    return <route.component
      navigator={navigator}
      {...route.passProps}
    />
  }

  render() {
    return (
      <Navigator
        style={styles.topBar}
        initialRoute={{
          name: 'Home',
          component: TabBar
        }}
        configureScene={this.configureScene}
        renderScene={ this.renderScene}
      />
    );
  }
}

AppRegistry.registerComponent('capstone', () => capstone);
