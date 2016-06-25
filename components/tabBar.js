'use strict'

import React, {Component} from 'react';
import {
  AppRegistry,
  TabBarIOS,
  Text,
  View
} from 'react-native'
import styles from './styles';
import HomeButton from './homeButton';

var homeIcon = require('../resources/home.png');
var mapIcon = require('../resources/compass.png')
var chartIcon = require('../resources/pie-chart.png');
var settingsIcon = require('../resources/spanner.png');

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'Home'
    }
  }

  _setTab(tabName) {
    this.setState({selectedTab: tabName});
  }

  _renderContent(color, pageText, num) {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
      </View>
    );
  }

  render() {
    return (
      <TabBarIOS
        styles={styles.tabBar}
        unselectedTintColor="#929292"
        tintColor="#232323"
        itemPositioning="fill"
        barTintColor="#56545C">
        <TabBarIOS.Item
          title="Home"
          icon={homeIcon}
          selected={this.state.selectedTab === 'Home'}
          onPress={() => this._setTab('Home')}>
          <HomeButton/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Map"
          icon={mapIcon}
          selected={this.state.selectedTab === 'Map'}
          onPress={() => this._setTab('Map')}>
          {this._renderContent('darkslateblue', 'Map Page')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Chart"
          icon={chartIcon}
          selected={this.state.selectedTab === 'Chart'}
          onPress={() => this._setTab('Chart')}>
          {this._renderContent('red', 'Chart Page')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Settings"
          icon={settingsIcon}
          selected={this.state.selectedTab === 'Settings'}
          onPress={() => this._setTab('Settings')}>
          {this._renderContent('grey', 'Settings Page')}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

AppRegistry.registerComponent('TabBar', () => TabBar);

module.exports = TabBar;
