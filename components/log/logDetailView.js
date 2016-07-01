import React, { Component } from 'react';
import {
  Text,
} from 'react-native';
import styles from '../styles';


class LogDetailView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var isLocation = this.props.type === 'Locations';
    if (isLocation) {
      return (
        <Text style={{marginTop: 120}}>
          {this.props.name}
          {this.props.city}
          {this.props.state}
          {this.props.country}
          {this.props.timeSpent}
        </Text>
      )
    } else {
      return (
        <Text style={{marginTop: 120}}>
          {this.props.name}
          {this.props.description}
          {this.props.time_traveled}
        </Text>
      )
    }
  }
}

module.exports = LogDetailView;
