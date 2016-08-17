'use strict';

import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from '../styles';

export default class LogEditEntry extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <View style={styles.detailHeaderContainer}>
          <Text style={styles.detailViewBodyHeader}>{this.props.header}</Text>
        </View>
        <TextInput style={[styles.detailViewBody, {height: 30}]}
          selectTextOnFocus={true}
          onChangeText={this.props.onChangeText}
          defaultValue={this.props.defaultValue}
        />
      </View>
    );
  }
}