'use strict'

import React, { Component } from 'react';
import {
  Text,
  Navigator,
  TouchableHighlight,
  View
} from 'react-native';
import styles from './styles';

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if (index > 0) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => {if (index > 0) navigator.pop()}}>
          <Text style={styles.leftNavButtonText}>Back</Text>
        </TouchableHighlight>
      )
    } else {
      return null;
    }
  },

  RightButton(route, navigator, index, navState) {
    return null;
  },

  Title(route, navigator, index, navState) {
    return <Text style={styles.NavBarTitle}>Down Time</Text>;
  },
}

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

class HomeButtonNavigator extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    return (
      <route.component
        navigator={navigator}
        {...route.passProps}
      />
    )
  }

  render() {
    return (
      <Navigator
        style={{flex: 1}}
        initialRoute={{
          name: 'Home',
          component: HomeButton
        }}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            style={styles.navBar}
            routeMapper={NavigationBarRouteMapper}/>
        }
      />
    );
  }
}
Navigator
module.exports = HomeButtonNavigator;
