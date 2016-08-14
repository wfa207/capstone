'use strict'

import React, { Component } from 'react'
import {
  TextInput,
  Animated,
  Text,
  View,
  Dimensions,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import styles from '../styles';
import { getDbData, formatElapTime } from '../../../utils';

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

    getDbData()
    .then(locations => {
      // locationPercentages is an array-like object that uses location._id as 
      //   its key values
      let locationPercentages = {};
      let locationTimes = locations.map(location => location.timeSpentMS);
      let totalTimeSpent = locationTimes.reduce((a, b) => a + b);
      let locAnimStates = {};

      locations.forEach(location => {
        locAnimStates[location._id] = new Animated.Value(0);
      });
      
      this.setState(locAnimStates);

      // fill up the locationPercentages object that will be used to store
      //   the 'percentage' information about each location
      // the key is the location ids
      locations.forEach((location, i) => {
        let timeSpent = location.timeSpentMS;
        let percent = Math.floor(timeSpent/(totalTimeSpent)*1000000)/10000;
        locationPercentages[location._id] = percent;
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
        let percentage = locationPercentages[location._id];
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
        return Animated.timing(this.state[location._id], {toValue: locationPercentages[location._id]/greatestPercentage * 300, duration: 1000});
      })).start();
      Animated.timing(this.state.fadeAnim, {toValue: 1}).start();
    })
    .catch(alert)
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
            let output = formatElapTime(rowData.timeSpent);
            let smallPercentage = rowData.ratio < 0.1;
            let barStyles = [rowData.percentageStyle, {opacity: this.state.fadeAnim, position: 'absolute', top: 60, left: 25}];
            if (smallPercentage) {
              barStyles[1].left = 26 + 7 * Math.floor(rowData.percent);
            }
            return (
              <View key={rowData.location.name} style={styles.chartRow}>
                <Text style={styles.chartText}>{rowData.location.name}</Text>
                <Animated.Text style={[styles.timeText]}>
                  {output}
                </Animated.Text>
                <Animated.View style={[styles.bar, {backgroundColor: rowData.colors[rowData.i % 10]}, {width: this.state[rowData.location._id]}]}>
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

export default Chart;