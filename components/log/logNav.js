'use strict'

import React, { Component } from 'react';
import {
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';
import styles from '../styles';
import Log from './log';
import LogDetailView from './logDetailView';


function genNavBarMapper(title) {
  return {
    LeftButton(route, navigator, index, navState) {
      if (index > 0) {
        return (
          <TouchableHighlight
          underlayColor="transparent"
          onPress={() => navigator.pop()}>
          <Text style={styles.leftNavButtonText}>Back</Text>
          </TouchableHighlight>
        );
      } else {
        return null;
      }
    },

    RightButton(route, navigator, index, navState) {
      return null;
    },

    Title(route, navigator, index, navState) {
      return <Text style={styles.NavBarTitle}>{title}</Text>;
    },
  }
}

function genNavBar(title) {
  return (
    <Navigator.NavigationBar
    style={styles.navBar}
    routeMapper={genNavBarMapper(title)}/>
  )
}

class LogNav extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
      if (route.name === 'Log Home') {
        return <route.component
        navigator={navigator}
        {...route.passProps}
        />
      } else {
        return <LogDetailView
        navigator={navigator}
        {...route.passProps}/>
      }
  }

  render() {
    return (
      <Navigator
        initialRoute={{
          name: 'Log Home',
          component: Log
        }}
        style={styles.banner}
        renderScene={this.renderScene}
        navigationBar={genNavBar('Log')}
      />
    );
  }
}

module.exports = LogNav;
