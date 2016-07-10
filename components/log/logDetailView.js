import React, { Component } from 'react';
import {
  Text,
  ListView,
  View
} from 'react-native';
import styles from '../styles';
import { formatElapTime } from '../../utils'

class LogDetailView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let times = this.props.times;
    var timeStr = times.length > 1 ? ' visits' : ' visit';

    return (
      <View style={styles.detailContainer}>
        <Text style={styles.detailViewTitle}>
          {this.props.name}
        </Text>
        <View style={styles.detailHeaderContainer}>
          <Text style={styles.detailViewBodyHeader}>Address</Text>
        </View>
        <Text style={styles.detailViewBody}>
          {this.props.street}
        </Text>
        <Text style={styles.detailViewBody}>
          {this.props.city}, {this.props.state} {this.props.ZIP}
        </Text>
        <Text style={styles.detailViewBody}>
          {this.props.country}
        </Text>
        <View style={styles.detailHeaderContainer}>
          <Text style={styles.detailViewBodyHeader}>Total time spent here</Text>
        </View>
          <Text style={styles.detailViewBody}>{formatElapTime(this.props.timeSpentMS)}</Text>
        <View style={styles.detailHeaderContainer}>
          <Text style={styles.detailViewBodyHeader}>Total visits</Text>
        </View>
          <Text style={styles.detailViewBody}>{this.props.times.length + timeStr}</Text>
        <View style={styles.detailHeaderContainer}>
          <Text style={styles.detailViewBodyHeader}>Dates visited</Text>
        </View>
          <Text style={styles.detailViewBody}>NEED TO UPDATE</Text>
      </View>
    )}
}

module.exports = LogDetailView;
