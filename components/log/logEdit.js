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
        <View style={styles.inline}>
          <Text style={styles.detailViewBodyHeader}>Total visits: </Text>
          <Text style={styles.detailViewBody}>{this.props.visits}</Text>
        </View>
        </View>
      )
    }
  },

  render() {
    var isLocation = this.props.type === 'Locations';
    return (
      <View
      style={styles.detailContainer}>
        <TextInput style={[styles.detailViewTitle, {height: 40}]}
        ref={component => this._nameInput = component}
        defaultValue={this.props.name}/>
        {this.locationOrActivityRender(isLocation)}
      </View>
    )
  }
});

module.exports = LogEditView;
