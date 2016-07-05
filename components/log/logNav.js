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

  // renderScene(route, navigator) {
  //   return <route.component
  //   ref='butts'
  //   navigator={navigator}
  //   {...route.passProps}/>
  // },

  render() {
    var navigationBar = (
      <Navigator.NavigationBar
        style={styles.navBar}
        routeMapper={{LeftButton(route, navigator, index, navState) {
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
                underlaycolor="transparent"
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
                onPress={() => console.log(this)}
                underlayColor="transparent">
                <Text style={styles.rightNavButtonText}>Done</Text>
                </TouchableHighlight>
              )
          };
        },

        Title(route, navigator, index, navState) {
          return <Text style={styles.NavBarTitle}>{route.title}</Text>;
        }}}/>
      );

    return (
      <Navigator
        initialRoute={{
          title: 'Logs',
          component: Log
        }}
        style={styles.banner}
        configureScene={this.configureScene}
        renderScene={(route, navigator) => {
          return <route.component
          ref="test"
          navigator={navigator}
          {...route.passProps}/>
        }}
        navigationBar={navigationBar}/>
    );
  }
})

module.exports = LogNav;
