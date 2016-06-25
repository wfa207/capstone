/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Navigator,
  TouchableHighlight,
  TabBarIOS,
  View
} from 'react-native';
import styles from './styles';
import HomeButton from './homeButton';
import TabBar from './tabBar';

class capstone extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedTab: 'Home'}
  }

  // configureScene(route, routeStack) {
  //   var sceneSwitch = Navigator.SceneConfigs;
  //   console.log(route);
  //   switch(route.name) {
  //     case 'Charts':
  //       return sceneSwitch.HorizontalSwipeJump;
  //     break;
  //     default:
  //     break;
  //   }
  // }
  //
  // renderScene(route, navigator) {
  //   return <route.component
  //     navigator={ navigator }
  //     { ...route.passProps }
  //   />
  // }

  setTab(tabName) {
    this.setState({selectedTab: tabName});
  }

  render() {
    return (
      // <Navigator
      //   style={styles.topBar}
      //   initialRoute={{
      //     name: 'Home',
      //     component: HomeButton
      //   }}
      //   configureScene={ this.configureScene }
      //   renderScene={ this.renderScene }
      // />
      <TabBarIOS
        style={styles.tabBar}
        unselectedTintColor="#929292"
        tintColor="#232323"
        barTintColor="#56545C"
        itemPositioning="fill">
        <TabBarIOS.Item
          title="Home"
          icon={require('./resources/home.png')}
          selected={this.state.selectedTab === 'Home'}
          onPress={() => this.setTab('Home')}>
          <View style={styles.tabContent}>
            <Text style={styles.tabText}>Home</Text>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Map"
          icon={require('./resources/compass.png')}
          selected={this.state.selectedTab === 'Map'}
          onPress={() => this.setTab('Map')}>
          <View style={styles.tabContent}>
            <Text style={styles.tabText}>Map</Text>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Charts"
          icon={require('./resources/pie-chart.png')}
          selected={this.state.selectedTab === 'Charts'}
          onPress={() => this.setTab('Charts')}>
          <View style={styles.tabContent}>
            <Text style={styles.tabText}>Charts</Text>
          </View>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Settings"
          icon={require('./resources/spanner.png')}
          selected={this.state.selectedTab === 'Settings'}
          onPress={() => this.setTab('Settings')}>
          <View style={styles.tabContent}>
            <Text style={styles.tabText}>Settings</Text>
          </View>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

AppRegistry.registerComponent('capstone', () => capstone);
