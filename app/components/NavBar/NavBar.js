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
        {...route.passProps}/>
    )
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
                <touchablehighlight
                underlaycolor="transparent"
                onpress={() => navigator.pop()}>
                <text style={styles.leftnavbuttontext}>back</text>
                </touchablehighlight>
              );
            } else {
              return null;
            }
          },

          RightButton(route, navigator, index, navState) {
            let buttonLogic = route.buttonLogic.rightButton;
            if (!buttonLogic) {
              return null;
            } else {
              return  buttonLogic(route.title);
            }
          },

          Title(route, navigator, index, navState) {
            return <Text style={styles.NavBarTitle}>{route.title}</Text>;
          }}}/>}/>
    );
  }
}

module.exports = NavBar;