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
import {fetchAllLocations, fetchTimes} from '../utils';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Chart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      start: new Animated.Value(0),
      location1: 300,
      isLoading: true,
      fadeAnim: new Animated.Value(0),
      dataSource: ds.cloneWithRows(['row 1', 'row 2'])
    }
  }

  componentWillMount () {
    const locationNames = ['location1'];
    const width = this.getWidth(this.state, locationNames);
    let colors = ['#7F4FE1', '#F1FF58', '#FF1600', '#007AFF', '#49FF56', '#FF6200', '#00FF98', '#1200FF', '#FF0DCF', '#FFFEFB'];
    let times;
    fetchTimes()
    .then(_times => {
      times = _times;
      return fetchAllLocations()
    })
    .then(locations => {
      let locationPercentages = {}, greatestPercentage = 0;
      locations.forEach(location => {
        this.setState(
          {
            [location.id]: new Animated.Value(0)
          }
        );
      });
      var listLocations = locations.map((location, i) => {

        let time = times.find(time => {
          return time.locationId === location.id;
        });
        time.arrived = new Date(time.arrived);
        time.left = new Date(time.left);
        let timeArrived = time.arrived.getHours() * 60 + time.arrived.getMinutes();
        let timeLeft = time.left.getHours() * 60 + time.left.getMinutes();
        let percent = Math.floor((timeLeft-timeArrived)/(24*60)*10000)/100;
        let percentDisplay = (percent < 1) ? "<1" : (Math.round(percent)).toString();
        locationPercentages[location.id] = percent;
        for (let key in locationPercentages) {
          let percentage = locationPercentages[key];
          if (percentage > greatestPercentage) greatestPercentage = percentage;
        }
        let percentageStyle = (percent < 1) ? styles.lessThan1 : styles.barText;

        return {
          location: location,
          percentageStyle: percentageStyle,
          percentDisplay: percentDisplay,
          colors: colors,
          i: i
        };
      })
      this.setState({
        listLocations: listLocations,
        dataSource: ds.cloneWithRows(listLocations),
        isLoading: false
      });
      Animated.parallel(locations.map(location => {
        return Animated.timing(this.state[location.id], {toValue: locationPercentages[location.id]/greatestPercentage * 300, duration: 1000});
      })).start();
      Animated.timing(this.state.fadeAnim, {toValue: 1}).start();
    })
    .catch(console.error)
  }

  getWidth (data, locations) {
    const deviceWidth = Dimensions.get('window').width;
    const maxWidth = 350;
    let width = {};
    let widthCap;
    locations.forEach(item => {
      widthCap = data[item];
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
    } else {
      return (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Breakdown of Today</Text>
          <ListView
          dataSource={this.state.dataSource}
          renderRow={rowData => {
            console.log(rowData)
            return (
              <View key={rowData.location.name} style={styles.chartRow}>
                <Text style={styles.chartText}>{rowData.location.name}</Text>
                <Animated.View style={[styles.bar, {backgroundColor: rowData.colors[rowData.i % 10]}, {width: this.state[rowData.location.id]}]}>
                  <Animated.Text style={[rowData.percentageStyle, {opacity: this.state.fadeAnim}]}>{rowData.percentDisplay}%</Animated.Text>
                </Animated.View>
              </View>
            )}}
          />
        </View>
      )
    }
  }
}


module.exports = Chart;