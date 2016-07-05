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

  locationOrActivityRender(isLocation) {
    if (!isLocation) {
      return (
        <View>
        <View style={styles.inline}>
          <Text>Label: </Text>
          <TextInput style={[styles.detailViewBody, {height:30}]} defaultValue={this.props.description}/>
        </View>
        </View>
      )
    } else {
      return (
        <View>
          <Text style={styles.detailViewBody}>City: </Text>
          <TextInput
          style={[styles.editViewBody, {height:40}]}
          defaultValue={this.props.city}/>
          <Text style={styles.detailViewBody}>State: </Text>
          <TextInput style={[styles.editViewBody, {height:40}]} defaultValue={this.props.state}/>
          <Text style={styles.detailViewBody}>Country: </Text>
          <TextInput style={[styles.editViewBody, {height:40}]} defaultValue={this.props.country}/>
          <Text style={styles.detailViewBody}>Description: </Text>
          <TextInput
          style={[styles.editViewBody, {height:40}]}
          multiline={true}
          defaultValue={this.props.description}/>
        </View>
      )
    }
  },

  render() {
    var isLocation = this.props.type === 'Locations';
    return (
      <View
      style={styles.detailContainer}>
        <TextInput style={[styles.detailViewTitle, {height: 30}]}
        ref={component => this._nameInput = component}
        defaultValue={this.props.name}/>
        {this.locationOrActivityRender(isLocation)}
      </View>
    )
  }
});

module.exports = LogEditView;
