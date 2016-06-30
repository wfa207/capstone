'use strict'

import React, { Component } from 'react';
import {
  SegmentedControlIOS,
  ListView,
  Text,
  View,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';
import styles from './styles';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var Log = React.createClass({

  getInitialState() {
    return {
      values: ['Activities', 'Locations'],
      value: 'Locations',
      dataSource: ds.cloneWithRows(['row 1', 'row 2'])
    }
  },

  componentDidMount() {
    this.fetchValueData(this.state.value);
  },

  _onValueChange(value) {
    this.fetchValueData(value)
    .then(() => {
      this.setState({
        value: value
      });
    })
  },

  fetchValueData(value) {
    value = value.toLowerCase();
    return AsyncStorage.getItem(value)
    .then((items) => {
      items = JSON.parse(items);
      return items;
    })
    .then((items) => {
      this.setState({dataSource: ds.cloneWithRows(items)});
    });
  },

  render() {
    return (
      <View style={styles.banner}>
        <SegmentedControlIOS
          style={styles.segmentControl}
          values={this.state.values}
          selectedIndex={this.state.values.indexOf(this.state.value)}
          onValueChange={this._onValueChange}
          tintColor='#48BBEC'
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={rowData=>
            <TouchableHighlight style={styles.rowStyle}>
              <Text>{rowData.name}</Text>
            </TouchableHighlight>}
        />
      </View>
    )
  }
});

module.exports = Log;
