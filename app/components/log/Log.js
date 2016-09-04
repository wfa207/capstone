'use strict';

import React, { Component } from 'react';
import {
  ListView,
  Text,
  Image,
  View,
  ActivityIndicator,
  RefreshControl,
  TouchableHighlight
} from 'react-native';
import styles from '../styles';
import { getDbData } from '../../../utils';
import LogDetailView from './LogDetailView';

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Log extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      loading: true,
      refreshing: false
    };
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getData();
  }

  getData = () => {
    getDbData()
    .then(locations => {
      this.setState({
        dataSource: ds.cloneWithRows(locations),
        loading: false,
        refreshing: false
      });
    })
    .catch(alert);
  }

  componentWillMount = () => {
    return this.getData();
  }

  componentWillReceiveProps = () => {
    return this.getData();
  }

  _navigate = (rowData) => {
    this.props.navigator.push({
      title: 'Details',
      component: LogDetailView,
      buttonLogic: this.props.buttonLogic,
      passProps: rowData
    });
  }

  render() {
    if (this.state.loading) { return <ActivityIndicator/>; }
    else {
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
          renderRow={rowData => {
            return <TouchableHighlight
            onPress={() => this._navigate(rowData)}
            style={styles.rowStyle}>
              <View>
                <Text style={styles.rowContent}>{rowData.name}</Text>
              </View>
            </TouchableHighlight>;}}
          />
        </View>
      );
    }
  }
}

export default Log;
