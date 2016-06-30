'use strict'

import React, { Component } from 'react';
import {
  SegmentedControlIOS,
  ListView,
  Text,
  View,
} from 'react-native';
import styles from './styles';

var Log = React.createClass({
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      values: ['Activities', 'Locations'],
      value: 'Activities',
      selectedIndex: 0,
      dataSource: ds.cloneWithRows(['row 1', 'row 2'])
    }
  },

  _onChange(event) {
    console.log(this);
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex
    });
  },

  _onValueChange(value) {
    this.setState({
      value: value
    });
  },

  render() {
    return (
      <View style={styles.banner}>
        <SegmentedControlIOS
          style={styles.segmentControl}
          values={this.state.values}
          selectedIndex={this.state.selectedIndex}
          onChange={this._onChange}
          onValueChange={this._onValueChange}
          tintColor='#48BBEC'
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={rowData=> <Text>{rowData}</Text>}
        />
      </View>
    )
  }
});

module.exports = Log;
