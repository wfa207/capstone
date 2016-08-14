'use strict';

import React, { Component } from 'react';
import {
  Text,
  ListView,
  View
} from 'react-native';
import styles from '../styles';
import {
  formatElapTime,
  getDbData,
  formatToTime,
  formatToDate
} from '../../../utils';

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class LogDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  componentWillReceiveProps() {
    return getDbData()
    .then(locations => {
      let location = locations.filter(elem => elem._id === this.state._id)[0];
      let newState = location;
      newState.dataSource = ds.cloneWithRows(location.times);
      this.setState(newState);
      return locations;
    })
    .catch(alert);
  }

  componentWillMount() {
    return this.setState({
      dataSource: ds.cloneWithRows(this.state.times)
    });
  }

  render() {
    let times = this.state.times;
    var timeStr = times.length > 1 ? ' visits' : ' visit';

    return (
      <View style={styles.detailContainer}>
        <Text style={styles.detailViewTitle}>
          {this.state.name}
        </Text>
        <View style={styles.detailHeaderContainer}>
          <Text style={styles.detailViewBodyHeader}>Address</Text>
        </View>
        <Text style={styles.detailViewBody}>
          {this.state.street}
        </Text>
        <Text style={styles.detailViewBody}>
          {this.state.city}, {this.state.state} {this.state.ZIP}
        </Text>
        <Text style={styles.detailViewBody}>
          {this.state.country}
        </Text>
        <View style={styles.detailHeaderContainer}>
          <Text style={styles.detailViewBodyHeader}>Total time spent here</Text>
        </View>
          <Text style={styles.detailViewBody}>{formatElapTime(this.state.timeSpentMS)}</Text>
        <View style={styles.detailHeaderContainer}>
          <Text style={styles.detailViewBodyHeader}>Total visits</Text>
        </View>
          <Text style={styles.detailViewBody}>{this.state.times.length + timeStr}</Text>
        <View style={styles.detailHeaderContainer}>
          <Text style={styles.detailViewBodyHeader}>Dates visited</Text>
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={rowData => {
            return (
              <View style={styles.inline}>
                <Text style={styles.detailViewBody}>{formatToDate(rowData.startTime)} at </Text>
                <Text style={styles.detailViewBody}>{formatToTime(rowData.startTime)}</Text>
              </View>);
          }}
        />
      </View>
    );}
}

export default LogDetailView;