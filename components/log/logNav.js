'use strict'

import React, { Component } from 'react';
import {
  Text,
  View,
  Navigator,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';
import styles from '../styles';
import Log from './log';
import LogEditView from './logEdit';
import LogDetailView from './logDetailView';

var LogNav = React.createClass({
  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.HorizontalSwipeJump;
  },

  render() {
    let me = this;
    const navigationBar = (
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
                onPress={() => {
                  var oldName = me._routeComponent.props.name;
                  var newName = me._routeComponent._nameInput._lastNativeText;
                  me._routeComponent.editLocationName(oldName, newName)
                  .then((updatedLocation) => {
                    updatedLocation.type = me._routeComponent.props.type;
                    navigator.replacePreviousAndPop({
                      title: 'Details',
                      component: LogDetailView,
                      passProps: updatedLocation
                    });
                  })
                  .catch(console.error);
                }}
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
          ref={component => this._routeComponent = component}
          navigator={navigator}
          {...route.passProps}/>
        }}
        navigationBar={navigationBar}/>
    );
  }
})

module.exports = LogNav;
