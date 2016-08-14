'use strict';

import React, { Component } from 'react';
import {
  TouchableHighlight,
  Navigator,
  Text
} from 'react-native';
import styles from '../styles';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    return (
      <route.component
        navigator={navigator}
        buttonLogic={route.buttonLogic}
        {...route.passProps}/>
    );
  }

  render() {
    return (
      <Navigator
        initialRoute={{
          name: this.props.name,
          component: this.props.component,
          title: this.props.title,
          buttonLogic: this.props.buttonLogic || undefined
        }}
        style={styles.banner}
        renderScene={this.renderScene}
        navigationBar={<Navigator.NavigationBar
          style={styles.navBar}
          routeMapper={{
            LeftButton(route, navigator, index, navState) {
              if (index > 0) {
                return (
                  <TouchableHighlight
                  underlayColor="transparent"
                  onPress={() => navigator.pop()}>
                  <Text style={styles.leftNavButtonText}>Back</Text>
                  </TouchableHighlight>
                );
              }
            },

            RightButton(route, navigator, index, navState) {
              let buttonLogic = route.buttonLogic;
              if (buttonLogic) { return buttonLogic(route, navigator); }
            },

            Title(route, navigator, index, navState) {
              return <Text style={styles.NavBarTitle}>{route.title}</Text>;
            }
          }}
        />}/>
    );
  }
}

export default NavBar;