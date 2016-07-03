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

var LogNav = React.createClass({
  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.HorizontalSwipeJump;
  },

  renderScene(route, navigator) {
    return <route.component
    navigator={navigator}
    {...route.passProps}/>
  },

  render() {
    var me = this;
    var routeMapper = {
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
        switch(route.title) {
          case 'Details':
            return (
              <TouchableHighlight
              underlayColor="transparent"
              onPress={() => navigator.push({
                title: "Edit",
                component: LogEditView,
                passProps: route.passProps,
              })}>
              <Text style={styles.rightNavButtonText}>Edit</Text>
              </TouchableHighlight>
            );
          break;
          case 'Edit':
            return (
              <TouchableHighlight
              underlayColor="transparent">
              <Text style={styles.rightNavButtonText}></Text>
              </TouchableHighlight>
            )
        };
      },

      Title(route, navigator, index, navState) {
        return <Text style={styles.NavBarTitle}>{route.title}</Text>;
      },
    }

    return (
      <Navigator
        initialRoute={{
          title: 'Logs',
          component: Log
        }}
        style={styles.banner}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
          style={styles.navBar}
          routeMapper={routeMapper}/>
        }/>
    );
  }
})

module.exports = LogNav;
