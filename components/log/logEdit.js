'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  AsyncStorage
} from 'react-native';
import styles from '../styles';

var LogEditView = React.createClass({
  getInitialState() {
    return this.props;
  },

  editLocationName(oldName, newName) {
    var updatedLocation;
    return AsyncStorage.getItem('locations')
    .then((locations) => {
      locations = JSON.parse(locations);
      var index;
      var location = locations.filter((location, idx) => {
        var bool = location.name === oldName;
        index = bool ? idx : index;
        return bool;
      })[0];
      location.name = newName || oldName;
      updatedLocation = location;
      locations.splice(index, 1, location);
      return AsyncStorage.setItem('locations', JSON.stringify(locations));
    })
    .then(() => updatedLocation)
    .catch(console.error);
  },

  render() {
    return (
      <View style={styles.detailContainer}>
        <TextInput style={[styles.detailViewTitle, {height: 40}]}
          ref={component => this._name = component}
          defaultValue={this.props.name}/>
        <View style={styles.detailHeaderContainer}>
          <Text style={styles.detailViewBodyHeader}>Street Address</Text>
        </View>
          <TextInput style={[styles.detailViewBody, {height: 30}]}
          ref={component => this._streetInput = component}
          defaultValue={this.props.street}/>
        <View style={styles.detailHeaderContainer}>
          <Text style={styles.detailViewBodyHeader}>City</Text>
        </View>
          <TextInput style={[styles.detailViewBody, {height: 30}]}
          ref={component => this._city = component}
          defaultValue={this.props.city}/>
        <View style={styles.detailHeaderContainer}>
          <Text style={styles.detailViewBodyHeader}>State</Text>
        </View>
          <TextInput style={[styles.detailViewBody, {height: 30}]}
          ref={component => this._state = component}
          defaultValue={this.props.state}/>
        <View style={styles.detailHeaderContainer}>
          <Text style={styles.detailViewBodyHeader}>Zip Code</Text>
        </View>
          <TextInput style={[styles.detailViewBody, {height: 30}]}
          ref={component => this._ZIP = component}
          defaultValue={this.props.ZIP.toString()}/>
        <View style={styles.detailHeaderContainer}>
          <Text style={styles.detailViewBodyHeader}>Country</Text>
        </View>
          <TextInput style={[styles.detailViewBody, {height: 30}]}
          ref={component => this._country = component}
          defaultValue={this.props.country}/>
      </View>
    )
  }
});

module.exports = LogEditView;
