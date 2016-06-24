import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
} from 'react-native';
import styles from './styles';

class Charts extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <Text>Would be Charts!</Text>
  }
}

AppRegistry.registerComponent('Charts', () => Charts);

module.exports = Charts;
