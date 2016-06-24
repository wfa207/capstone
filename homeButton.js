import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import styles from './styles';

class Button extends Component {
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
          style={styles.button}
          underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>
            Start log!
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

AppRegistry.registerComponent('Button', () => Button);

module.exports = Button;
