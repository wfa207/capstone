'use strict';

import React, {Component} from 'react';
import {
  AsyncStorage,
  TabBarIOS,
  Text,
  View
} from 'react-native';
import styles from '../styles';
import NavBar from '../NavBar/NavBar';
import HomeButton from '../HomeButton/HomeButton';
import Map from '../Map/Map';
import Log from '../Log/Log';
import Chart from '../Chart/Chart';
import LogRightButtonLogic from '../Log/LogRightButtonLogic';

let homeIcon = require('../../../resources/home.png');
let mapIcon = require('../../../resources/compass.png');
let logIcon = require('../../../resources/diary.png');
let chartIcon = require('../../../resources/pie-chart.png');

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedTab: 'Home'};
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
        style={styles.banner}
        unselectedTintColor="#929292"
        tintColor="#48BBEC"
        itemPositioning="fill"
        translucent={true}
        barTintColor="#56545C">
        <TabBarIOS.Item
          title="Home"
          icon={homeIcon}
          selected={this.state.selectedTab === 'Home'}
          onPress={() => this._setTab('Home')}>
          <NavBar name='Home' component={HomeButton} title='DownTime'/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='Map'
          icon={mapIcon}
          selected={this.state.selectedTab === 'Map'}
          onPress={() => {
            this._setTab('Map');
          }}>
          <NavBar name='Map' component={Map} title='Map'/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='Logs'
          icon={logIcon}
          selected={this.state.selectedTab === 'Logs'}
          onPress={() => this._setTab('Logs')}>
          <NavBar name='Log' component={Log} title='Log' buttonLogic={LogRightButtonLogic}/>
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title='Chart'
          icon={chartIcon}
          selected={this.state.selectedTab === 'Chart'}
          onPress={() => this._setTab('Chart')}>
          <NavBar name='Chart' component={Chart} title='Chart'/>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

export default TabBar;