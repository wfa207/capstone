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
var greatestPercentage = 0;

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

  componentWillMount() {
    this.getCharts();
  }

  componentWillReceiveProps() {
    this.setState({fadeAnim: new Animated.Value(0)});
    this.getCharts();
  }

  getCharts() {
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
      // locationPercentages is an array-like object that uses location.id as 
      //   its key values
      let locationPercentages = {};
      locations.forEach(location => {
        this.setState(
          {
            [location.id]: new Animated.Value(0)
          }
        );
      });
      let totalTimeSpent = 0;
      // locationTimes is an array that stores the times (arrived and left)
      //   of a specific location
      // its indices are the same as locations' indices
      let locationTimes = locations.map(location => {
        let time = times.find(time => {
          return time.locationId === location.id;
        });
        time.arrived = new Date(time.arrived);
        time.left = new Date(time.left);
        let timeArrived = time.arrived.getHours() * 3600 + time.arrived.getMinutes() * 60 + time.arrived.getSeconds();
        let timeLeft = time.left.getHours() * 3600 + time.left.getMinutes() * 60 + time.left.getSeconds();
        let timeSpent = timeLeft-timeArrived;
        totalTimeSpent += timeSpent;
        return timeSpent;
      });

      // fill up the locationPercentages object that will be used to store
      //   the 'percentage' information about each location
      // the key is the location ids
      locations.forEach((location, i) => {
        let timeSpent = locationTimes[i];
        let percent = Math.floor(timeSpent/(totalTimeSpent)*1000000)/10000;
        locationPercentages[location.id] = percent;
        console.log(location.id, percent)
      });

      // Get the greatest percentage out of all the locations
      for (let key in locationPercentages) {
        let percentage = locationPercentages[key];
        if (percentage > greatestPercentage) greatestPercentage = percentage;
      }

      // start setting up listLocations, which is an array of objects,
      //   each of which store information about styling and values that will be
      //   displayed on the view
      let listLocations = locations.map((location, i) => {
        let timeSpent = locationTimes[i];
        let percent = Math.floor(timeSpent/(totalTimeSpent)*1000000)/10000;
        let percentDisplay, percentageStyle, ratio;
        let percentage = locationPercentages[location.id];
        ratio = percentage/greatestPercentage;
        percentageStyle = (ratio < 0.1) ? styles.lessThan1 : styles.barText;
        percentDisplay = (percent < 1 && ratio < 0.01) ? "<1" : (Math.floor(percent*100)/100).toString();

        return {
          location: location,
          percent: percent,
          ratio: ratio,
          percentageStyle: percentageStyle,
          percentDisplay: percentDisplay,
          colors: colors,
          i: i,
          timeSpent: timeSpent
        };
      });
      listLocations.sort((a,b) => {
        return b.percent - a.percent;
      });
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
            let hours = Math.floor(rowData.timeSpent/3600);
            let hourStr = (hours == 0) ? "" : (hours == 1) ? hours + " hr" : hours + " hrs";
            let minutes = Math.floor(rowData.timeSpent/60);
            let minStr = (minutes == 0) ? "" : (minutes == 1) ? minutes + " min" : minutes + " mins";
            let seconds = Math.floor(rowData.timeSpent%3600)%60;
            let secStr = (seconds == 0) ? "" : (seconds == 1) ? seconds + " sec" : seconds + " secs";
            let arr = [hourStr, minStr, secStr];
            let output = arr.filter(str => {
              return (str.length > 0) ? true : false;
            });
            let smallPercentage = rowData.ratio < 0.1;
            let barStyles = [rowData.percentageStyle, {opacity: this.state.fadeAnim, position: 'absolute',
                                                        top: 60, left: 25}];
            if (smallPercentage) {
              barStyles[1].left = 26 + 7*Math.floor(rowData.percent);
            }
            return (
              <View key={rowData.location.name} style={styles.chartRow}>
                <Text style={styles.chartText}>{rowData.location.name}</Text>
                <Animated.Text style={[styles.timeText]}>
                  {output.join(', ')}
                </Animated.Text>
                <Animated.View style={[styles.bar, {backgroundColor: rowData.colors[rowData.i % 10]}, {width: this.state[rowData.location.id]}]}>
                </Animated.View>
                <Animated.Text style={barStyles}>
                  {rowData.percentDisplay}%
                </Animated.Text>
              </View>
            )}}
          />
        </View>
      )
    }
  }
}


module.exports = Chart;