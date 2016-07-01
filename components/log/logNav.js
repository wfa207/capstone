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
import LogEditView from './logEdit';

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
      if (route.title === 'Details') {
        return (
          <TouchableHighlight
          underlayColor="transparent"
          onPress={() => navigator.push({
            title: "Edit",
            component: LogEditView,
            passProps: route.passProps
          })}>
          <Text style={styles.rightNavButtonText}>Edit</Text>
          </TouchableHighlight>
        );
      };
    },

    Title(route, navigator, index, navState) {
      return <Text style={styles.NavBarTitle}>{route.title}</Text>;
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

  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.HorizontalSwipeJump;
  }

  renderScene(route, navigator) {
    return <route.component
    navigator={navigator}
    {...route.passProps}/>
  }

  render() {
    return (
      <Navigator
        initialRoute={{
          title: 'Logs',
          component: Log
        }}
        style={styles.banner}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
        navigationBar={genNavBar('Log')}
      />
    );
  }
}

module.exports = LogNav;
