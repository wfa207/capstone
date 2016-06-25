'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import styles from './styles';

class HomeButton extends Component {
  constructor(props) {
    super(props)
  }

  _navigate(name) {
    this.props.navigator.push({
      name: name,
      passProps: {
        name: name
      }
    });
  }

  _setTab(tabName) {
    console.log(tabName);
    this.setState({selectedTab: tabName})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <TouchableHighlight
            style={styles.button}
            // onPress={() => this._navigate('Charts')}
            onPress={() => this._setTab('Map')}
            underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>
              Start log!
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('HomeButton', () => HomeButton);

module.exports = HomeButton;
