'use strict'

import React, {Component} from 'react';
import {
  TabBarIOS,
  Text,
  View
} from 'react-native'
import styles from './styles';
import HomeButton from './homeButton';
import Map from './map';

var homeIcon = require('../resources/home.png');
var mapIcon = require('../resources/compass.png')
var chartIcon = require('../resources/pie-chart.png');
var settingsIcon = require('../resources/spanner.png');

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedTab: 'Home'}
  }

  _setTab(tabName) {
    this.setState({selectedTab: tabName});
  }

  _renderContent(text) {
    return (
      <View style={styles.container}>
        <Text style={styles.buttonText}>{text}</Text>
      </View>
    );
  }

  render() {
    return (
      <TabBarIOS
        style={styles.tabBar}
        unselectedTintColor="#929292"
        tintColor="#232323"
        itemPositioning="fill"
        translucent={true}
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
          <Map/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Chart"
          icon={chartIcon}
          selected={this.state.selectedTab === 'Chart'}
          onPress={() => this._setTab('Chart')}>
          {this._renderContent('Chart Page')}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title="Settings"
          icon={settingsIcon}
          selected={this.state.selectedTab === 'Settings'}
          onPress={() => this._setTab('Settings')}>
          {this._renderContent('Settings Page')}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

module.exports = TabBar;
