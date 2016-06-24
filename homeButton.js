import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import styles from './styles';
import Charts from './charts';
import TabBar from './tabBar';

class HomeButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logging: false,
      selectedTab: 'home'
    }
  }

  _navigate(name) {
    this.props.navigator.push({
      component: Charts,
      name: name,
      passProps: {
        name: name
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => this._navigate('Charts')}
          underlayColor='#99d9f4'>
          <Text style={styles.buttonText}>
            Start log!
          </Text>
        </TouchableHighlight>
        <TabBar/>
      </View>
    );
  }
}

AppRegistry.registerComponent('Button', () => HomeButton);

module.exports = HomeButton;
