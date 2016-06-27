'use strict';

import React, { Component } from 'react';
import {
  MapView,
  View
} from 'react-native';
import styles from './styles';

class Map extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}/>
      </View>
    )
  }
}

module.exports = Map;
