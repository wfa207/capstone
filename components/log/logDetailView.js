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
          <Text style={styles.detailViewBody}>Location: </Text>
          <Text style={styles.detailViewBody}>
          {this.props.city}, {this.props.state}, {this.props.country}
          </Text>
          <Text style={styles.detailViewBody}>
            timeSpent: {this.props.timeSpent}
          </Text>
        </View>
      )
    }
  }

  render() {
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
