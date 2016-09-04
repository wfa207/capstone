'use strict';

import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  AsyncStorage
} from 'react-native';
import styles from '../styles';
import { getDbData } from '../../../utils';
import LogEditEntry from './LogEditEntry';

class LogEditView extends Component {
  constructor(props) {
    super(props);
    this.state = {...this.props,
      newLocationValues: {}
    };
  }

  componentWillReceiveProps = () => {
    return this._updateLocation();
  }

  componentWillMount = () => {
    return this._updateLocation();
  }

  _updateLocation = () => {
    return getDbData()
    .then(locations => {
      let location = locations.filter(elem => elem._id === this.state._id)[0];
      this.setState(location);
      return locations;
    })
    .catch(alert);
  }

  saveNewStateProps = (key, newValue) => {
    newValue = newValue || this.props[key];
    let newLocationValues = this.state.newLocationValues;
    newLocationValues[key] = newValue;
    this.setState({ newLocationValues: newLocationValues });
  }

  render() {
    this.props.navigator._component = this;
    return (
      <View
      style={styles.detailContainer}>

        <TextInput style={[styles.detailViewTitle, {height: 40}]}
          ref={'name'}
          selectTextOnFocus={true}
          onChangeText={text => this.saveNewStateProps('name', text)}
          defaultValue={this.state.name}/>
        <LogEditEntry header="Street address"
          ref={'street'}
          onChangeText={text => this.saveNewStateProps('street', text)}
          defaultValue={this.state.street}
        />
        <LogEditEntry header="City"
          ref={'city'}
          onChangeText={text => this.saveNewStateProps('city', text)}
          defaultValue={this.state.city}
        />
        <LogEditEntry header="State"
          ref={'state'}
          onChangeText={text => this.saveNewStateProps('state', text)}
          defaultValue={this.state.state}
        />
        <LogEditEntry header="Zip code"
          ref={'ZIP'}
          onChangeText={text => this.saveNewStateProps('ZIP', text)}
          defaultValue={this.state.ZIP.toString()}
        />
        <LogEditEntry header="Country"
          ref={'country'}
          onChangeText={text => this.saveNewStateProps('country', text)}
          defaultValue={this.state.country}
        />
      </View>
    );
  }
}

export default LogEditView;
