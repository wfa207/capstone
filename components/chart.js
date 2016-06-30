'use strict'

import React, { Component } from 'react'
import {
  Animated,
  Text,
  View,
  Dimensions,
  ListView,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';
import styles from './styles';
import {fetchAllLocations} from '../utils';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Chart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      start: new Animated.Value(40),
      location1: new Animated.Value(0),
      isLoading: true
    }
  }

  componentWillMount () {
    const locations = ['location1'];
    const width = this.getWidth(this.state, locations);

    fetchAllLocations()
    .then(locations => {
      var listLocations = locations.map(location => {
        return (
          <View>
            <Text>{location.name}</Text>
            <Animated.View style={[styles.bar, {backgroundColor: '#F55443'}, {width: this.state.location1}]}>
            </Animated.View>
          </View>
        );
      })
      this.setState({
        listLocations: listLocations,
        isLoading: false
      });
      Animated.parallel(locations.map(item => {
        return Animated.timing(this.state[item], {toValue: width[item]});
      })).start();
    })
  }

  getWidth (data, locations) {
    const deviceWidth = Dimensions.get('window').width;
    const maxWidth = 350;
    let width = {};
    let widthCap;
    locations.forEach(item => {
      widthCap = data[item] * 5
      width[item] = widthCap <= (deviceWidth - 50) ? widthCap : (deviceWidth - 50);
    })

    return width;
  }

  render () {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Text style={styles.chartText}>Breakdown of Today</Text>
      </View>
   )
  }
}


module.exports = Chart;
