'use strict'

import React, { Component } from 'react';
import {
  Text,
  Navigator,
  TouchableHighlight,
  View
} from 'react-native';
import styles from './styles';

class HomeButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logging: false
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          navigator={navigator}
          style={this.state.logging ? styles.stopButton : styles.logButton}
          onPress={() => this.setState({logging: !this.state.logging})}
          underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>
              {(this.state.logging ? 'Stop' : 'Start') + '\n'}logging
            </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

module.exports = HomeButton;
