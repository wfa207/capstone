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
import Log from './Log';
import LogEditView from './LogEdit';
import LogDetailView from './LogDetailView';
import { db } from '../../../database';

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
                onPress={() => navigator.push({
                  title: "Edit Name",
                  component: LogEditView,
                  passProps: route.passProps})}
                underlayColor="transparent">
                <Text style={styles.rightNavButtonText}>Edit</Text>
                </TouchableHighlight>
              );
            break;
            case 'Edit Name':
              return (
                <TouchableHighlight
                onPress={() => {
                  var locationId = me._routeComponent.props._id;
                  var newLocationValues = me._routeComponent.state.newLocationValues || {};
                  if (Object.keys(newLocationValues).length) {
                    return db.locations.updateById(newLocationValues, locationId)
                    .then(() => navigator.pop())
                  }
                  navigator.pop();
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

export default LogNav;
