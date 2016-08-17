'use strict';

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from '../styles';

export default class LogDetailEntry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let body = [];
    if (this.props.value) {
      for (let i = 0; i < this.props.value.length; i++) {
        body.push(
          <Text style={styles.detailViewBody}>
            {this.props.value[i]}
          </Text>
        );
      }
    }
    return (
      <View>
        <View style={styles.detailHeaderContainer}>
          <Text style={styles.detailViewBodyHeader}>{this.props.header}</Text>
        </View>
        <View>{body}</View>
      </View>
    );
  }
}