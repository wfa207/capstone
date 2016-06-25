'use strict'

import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import styles from './styles';

class HomeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logging: false
    }
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
            logging={false}
            style={this.state.logging ? styles.stopButton : styles.logButton}
            // onPress={() => this._navigate('Charts')}
            onPress={() => this.setState({logging: !this.state.logging})}
            underlayColor='#99d9f4'>
            <Text style={styles.buttonText}>
              {this.state.logging ? 'Stop' : 'Start log!'}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

module.exports = HomeButton;
