'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  AsyncStorage
} from 'react-native';
import styles from '../styles';
import { getDbData } from '../../utils';

var LogEditView = React.createClass({
  getInitialState() {
    return this.props;
  },

  componentWillReceiveProps() {
    return this._updateLocation();
  },

  componentWillMount() {
    return this._updateLocation();
  },

  _updateLocation() {
    return getDbData()
    .then(locations => {
      let location = locations.filter(elem => elem._id === this.state._id)[0];
      this.setState(location);
      return locations;
    })
    .catch(alert);
  },

  saveNewStateProps(key, newValue) {
    newValue = newValue || this.refs[key]._lastNativeText;
    var newLocationValues = this.state.newLocationValues;

    if (!newLocationValues && newValue) this.setState({newLocationValues: {[key]: newValue}});
    else if (newValue) {
      newLocationValues[key] = newValue;
      this.setState({newLocationValues: newLocationValues});
    }
  },

  render() {
    return (
      <View ref={component => this._routeComponent = component}
      style={styles.detailContainer}>
        <TextInput style={[styles.detailViewTitle, {height: 40}]}
          ref={'name'}
          selectTextOnFocus={true}
          onEndEditing={() => this.saveNewStateProps('name')}
          onChangeText={text => this.saveNewStateProps('name', text)}
          defaultValue={this.state.name}/>
        <View style={styles.detailHeaderContainer}>
          <Text style={styles.detailViewBodyHeader}>Street Address</Text>
        </View>
          <TextInput style={[styles.detailViewBody, {height: 30}]}
          ref={'street'}
          selectTextOnFocus={true}
          onEndEditing={() => this.saveNewStateProps('street')}
          onChangeText={text => this.saveNewStateProps('street', text)}
          defaultValue={this.state.street}/>
        <View style={styles.detailHeaderContainer}>
          <Text style={styles.detailViewBodyHeader}>City</Text>
        </View>
          <TextInput style={[styles.detailViewBody, {height: 30}]}
          ref={'city'}
          selectTextOnFocus={true}
          onEndEditing={() => this.saveNewStateProps('city')}
          onChangeText={text => this.saveNewStateProps('city', text)}
          defaultValue={this.state.city}/>
        <View style={styles.detailHeaderContainer}>
          <Text style={styles.detailViewBodyHeader}>State</Text>
        </View>
          <TextInput style={[styles.detailViewBody, {height: 30}]}
          ref={'state'}
          selectTextOnFocus={true}
          onEndEditing={() => this.saveNewStateProps('state')}
          onChangeText={text => this.saveNewStateProps('state', text)}
          defaultValue={this.state.state}/>
        <View style={styles.detailHeaderContainer}>
          <Text style={styles.detailViewBodyHeader}>Zip Code</Text>
        </View>
          <TextInput style={[styles.detailViewBody, {height: 30}]}
          ref={'ZIP'}
          selectTextOnFocus={true}
          onEndEditing={() => this.saveNewStateProps('ZIP')}
          onChangeText={text => this.saveNewStateProps('ZIP', text)}
          keyboardType={'number-pad'}
          defaultValue={this.state.ZIP.toString()}/>
        <View style={styles.detailHeaderContainer}>
          <Text style={styles.detailViewBodyHeader}>Country</Text>
        </View>
          <TextInput style={[styles.detailViewBody, {height: 30}]}
          ref={'country'}
          selectTextOnFocus={true}
          onEndEditing={() => this.saveNewStateProps('country')}
          onChangeText={text => this.saveNewStateProps('name', text)}
          defaultValue={this.state.country}/>
      </View>
    )
  }
});

module.exports = LogEditView;
