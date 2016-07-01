import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import styles from '../styles';


class LogDetailView extends Component {
  constructor(props) {
    super(props);
  }

  locationOrActivityRender(isLocation) {
    if (!isLocation) {
      return (
        <Text style={styles.detailViewBody}>
          {this.props.description}
          {this.props.time_traveled}
        </Text>
      )
    } else {
      return (
        <View>
        <View style={styles.inline}>
          <Text style={styles.detailViewBodyHeader}>Location: </Text>
          <Text style={styles.detailViewBody}>
          {this.props.city}, {this.props.state}, {this.props.country}
          </Text>
        </View>
        <View style={styles.inline}>
          <Text style={styles.detailViewBodyHeader}>Total time spent: </Text>
          <Text style={styles.detailViewBody}>{this.props.timeSpent}</Text>
        </View>
        </View>
      )
    }
  }

  render() {
    console.log(this.props);
    var isLocation = this.props.type === 'Locations';
    return (
      <View style={styles.detailContainer}>
        <Text style={styles.detailViewTitle}>
          {this.props.name}
        </Text>
        {this.locationOrActivityRender(isLocation)}
      </View>
    )}
}

module.exports = LogDetailView;
