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
      start: new Animated.Value(0),
      location1: 300,
      isLoading: true,
      fadeAnim: new Animated.Value(0)
    }
  }

  componentWillMount () {
    const locationNames = ['location1'];
    const width = this.getWidth(this.state, locationNames);
    let colors = ['#7F4FE1', '#F1FF58', '#FF1600', '#007AFF', '#49FF56'];
    fetchAllLocations()
    .then(locations => {
      locations.forEach(location => {
        this.setState(
          {
            [location.id]: new Animated.Value(0)
          }
        );
      });
      var listLocations = locations.map((location, i) => {
        console.log(this.state.start, this.state.location1)
        return (
          <View key={location.name} style={styles.chartRow}>
            <Text style={styles.chartText}>{location.name}</Text>
            <Animated.View style={[styles.bar, {backgroundColor: colors[i]}, {width: this.state[location.id]}]}>
               <Animated.Text style={[styles.barText, {opacity: this.state.fadeAnim}]}>{100}%</Animated.Text>
            </Animated.View>
          </View>
        );
      })
      this.setState({
        listLocations: listLocations,
        isLoading: false
      });
      Animated.parallel(locations.map(location => {
        return Animated.timing(this.state[location.id], {toValue: this.state.location1, duration: 1000});
      })).start();
      Animated.timing(this.state.fadeAnim, {toValue: 1}).start();
    })
    .catch(console.error) //
  }

  getWidth (data, locations) {
    const deviceWidth = Dimensions.get('window').width;
    const maxWidth = 350;
    let width = {};
    let widthCap;
    locations.forEach(item => {
      console.log(data[item])
      widthCap = data[item];
      console.log(widthCap)
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
        <Text style={styles.chartTitle}>Breakdown of Today</Text>
        {this.state.listLocations}
      </View>
    )
  }
}


module.exports = Chart;
