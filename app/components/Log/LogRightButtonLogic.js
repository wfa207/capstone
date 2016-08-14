'use strict';

import React, { Component } from 'react';
import {
  TouchableHighlight,
  Text
} from 'react-native';
import styles from '../styles';
import LogEditView from './LogEdit';
import { db } from '../../../database';

export default (route, navigator) => {
  switch(route.title) {
  case 'Details':
    return (
      <TouchableHighlight
      onPress={() => navigator.push({
        title: 'Edit Name',
        component: LogEditView,
        buttonLogic: route.buttonLogic,
        passProps: route.passProps})}
      underlayColor="transparent">
      <Text style={styles.rightNavButtonText}>Edit</Text>
      </TouchableHighlight>
    );
  case 'Edit Name':
    return (
      <TouchableHighlight
      onPress={() => {
        let locationId = navigator._component.props._id;
        let newLocationValues = navigator._component.state.newLocationValues;
        return db.locations.updateById(newLocationValues, locationId)
        .then(() => navigator.pop())
        .catch(alert);
      }}
      underlayColor="transparent">
      <Text style={styles.rightNavButtonText}>Done</Text>
      </TouchableHighlight>
    );
  default:
  return null;
  }
};