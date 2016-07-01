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
import styles from '../styles';

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
    console.log(this);
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

  _navigate(rowData) {
    rowData.type = this.state.value;
    this.props.navigator.push({
      passProps: rowData
    });
  },

  render() {
    return (
      <View style={styles.container}>
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
            <TouchableHighlight
            onPress={() => this._navigate(rowData)}
            style={styles.rowStyle}>
              <View>
                <Text>{rowData.name}</Text>
              </View>
            </TouchableHighlight>}
        />
      </View>
    )
  }
});

module.exports = Log;
