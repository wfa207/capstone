'use strict';

import React, { Component } from 'react';
import {
  MapView,
  View
} from 'react-native';
import styles from './styles';

class Map extends Component {
  render() {
    return (
      <View>
        <MapView style={styles.map}/>
      </View>
    )
  }
}

module.exports = Map;
