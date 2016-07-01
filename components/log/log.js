'use strict'

import React, { Component } from 'react';
import {
  SegmentedControlIOS,
  ListView,
  Text,
  View,
  ActivityIndicator,
  AsyncStorage,
  TouchableHighlight
} from 'react-native';
import styles from '../styles';
import LogDetailView from './logDetailView';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var Log = React.createClass({

  getInitialState() {
    return {
      values: ['Activities', 'Locations'],
      value: 'Locations',
      dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      loading: true
    }
  },

  componentWillMount() {
    this.fetchValueData(this.state.value)
    .then((items) => {
      this.setState({
        dataSource: ds.cloneWithRows(items),
        loading: false
      });
    })
    .catch(console.error);
  },

  _onValueChange(value) {
    this.fetchValueData(value)
    .then((items) => {
      this.setState({
        dataSource: ds.cloneWithRows(items),
        value: value
      });
    })
    .catch(console.error);
  },

  fetchValueData(value) {
    value = value.toLowerCase();
    return AsyncStorage.getItem(value)
    .then((items) => {
      items = JSON.parse(items);
      return items;
    });
  },

  _navigate(rowData) {
    rowData.type = this.state.value;
    this.props.navigator.push({
      title: 'Details',
      component: LogDetailView,
      passProps: rowData
    });
  },

  render() {
    if (this.state.loading) {
      return <ActivityIndicator/>
    } else {
      return (
        <View style={styles.container}>
          <SegmentedControlIOS
          style={styles.segmentControl}
          values={this.state.values}
          selectedIndex={this.state.values.indexOf(this.state.value)}
          onValueChange={this._onValueChange}
          tintColor='#48BBEC'/>
          <ListView
          style={{marginTop: 10}}
          dataSource={this.state.dataSource}
          renderRow={rowData=>
            <TouchableHighlight
            onPress={() => this._navigate(rowData)}
            style={styles.rowStyle}>
              <View>
                <Text style={styles.rowContent}>{rowData.name}</Text>
              </View>
            </TouchableHighlight>}
          />
        </View>
      )
    }
  }
});

module.exports = Log;
