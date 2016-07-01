'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput
} from 'react-native';
import styles from '../styles';

class LogEditView extends Component {
  constructor(props) {
    super(props);
  }

  locationOrActivityRender(isLocation) {
    if (!isLocation) {
      return (
        <View style={styles.detailContainer}>
          <TextInput style={[styles.detailViewBody, {height:50}]} defaultValue={this.props.description}/>
        </View>
      )
    } else {
      return (
        <View style={styles.detailContainer}>
          <TextInput style={[styles.detailViewBody, {height:50}]} defaultValue={this.props.city}/>
          <TextInput style={[styles.detailViewBody, {height:50}]} defaultValue={this.props.state}/>
          <TextInput style={[styles.detailViewBody, {height:50}]} defaultValue={this.props.country}/>
          <TextInput style={[styles.detailViewBody, {height:50}]} defaultValue={this.props.description}/>
        </View>
      )
    }
  }

  render() {
    var isLocation = this.props.type === 'Locations';
    return (
      <View style={styles.detailContainer}>
        <TextInput style={styles.detailViewBody} defaultValue={this.props.name}/>
        {this.locationOrActivityRender(isLocation)}
      </View>
    )
  }


}

module.exports = LogEditView;
