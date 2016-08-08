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
    var value = this.state.value.toLowerCase();
    this.fetchValueData(value);
  },

  _onChange(event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex
    });
  },

  _onValueChange(value) {
    this.setState({
      value: value,
    });
  },

  fetchValueData(value) {
    AsyncStorage.getItem(value)
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
          onChange={this._onChange}
          onValueChange={this._onValueChange}
          tintColor='#48BBEC'
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={rowData =>
            <TouchableHighlight style={styles.rowStyle}>
              <Text>{rowData.name}</Text>
            </TouchableHighlight>}
        />
      </View>
    )
  }
});

module.exports = Log;

// <ListView
//   dataSource={ds.cloneWithRows(this.state.listLocations)}
//   renderRow={rowData => {
//     <TouchableHighlight style={styles.rowStyle}>
//       <Text>'Hello'</Text>
//     </TouchableHighlight>
//   }}
// >
// </ListView>
