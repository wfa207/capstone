'use strict';

import React, {Component} from 'react';
import {
  Navigator,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import styles from './styles';

var LogOptions = React.createClass({
  renderScene: function (route, navigator) {
    if (route.name === 'Locations') {
      return <Locations navigator={navigator} {...route.passProps} />
    }
    if (route.name === 'Activities') {
      return <Activities navigator={navigator} {...route.passProps} />
    }
  },

  render () {
    return (
      <Navigator
        style={{ flex:1 }}
        initialRoute={{ name: 'Locations' }}
        renderScene={ this.renderScene }
      />
    )
  }
});

var Locations = React.createClass({
  _navigate: function (name) {
    this.props.navigator.push({
      name: 'Activities',
      passProps: {
        name: name
      }
    })
  },

  render () {
    return (
      <View style={ styles.logsOption }>
        <TouchableHighlight
          style={styles.optionsButton}
          underlayColor='#FF941D'
          onPress={ () => this._navigate('Activities')}>
          <Text style={styles.optionsText}>Locations</Text>
        </TouchableHighlight>
      </View>
    )
  }
});

var Activities = React.createClass({
  _navigate: function (name) {
    this.props.navigator.push({
      name: 'Locations',
      passProps: {
        name: name
      }
    })
  },

  render () {
    return (
      <View style={ styles.logsOption }>
        <TouchableHighlight
          style={styles.optionsButton}
          underlayColor='#FF941D'
          onPress={ () => this._navigate('Locations')}>
          <Text style={styles.optionsText}>Activities</Text>
        </TouchableHighlight>
      </View>
    )
  }
});

module.exports = LogOptions, Locations, Activities;
