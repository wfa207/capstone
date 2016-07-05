'use strict'

import React, { Component } from 'react';
import {
  SegmentedControlIOS,
  ListView,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
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
      loading: true,
      refreshing: false
    }
  },

  _onRefresh() {
    this.setState({refreshing: true});
    this.refreshData();
  },

  refreshData() {
    this.fetchValueData(this.state.value)
    .then((items) => {
      var itemNames = {};
      var condensedItems = [];
      items.forEach((item) => {
        var name = item.name;
        if (!itemNames[name]) {
          itemNames[name] = 1;
          condensedItems.push(item);
        } else {
          itemNames[name] += 1;
        }
      });
      condensedItems.forEach((item) => {
        item.visits = itemNames[item.name];
      });
      this.setState({
        dataSource: ds.cloneWithRows(condensedItems),
        loading: false,
        refreshing: false
      });
    })
    .catch(console.error);
  },

  componentWillMount() {
    return this.refreshData();
  },

  componentWillReceiveProps() {
    return this.refreshData();
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
          <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />}
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
