'use strict';

import React, { Component } from 'react';
import {
  Text,
  ListView,
  View
} from 'react-native';
import styles from '../styles';
import {
  formatElapTime,
  getDbData,
  formatToTime,
  formatToDate
} from '../../../utils';
import LogDetailEntry from './LogDetailEntry';

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class LogDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = this.props;
  }

  componentWillReceiveProps() {
    return getDbData()
    .then(locations => {
      let location = locations.filter(elem => elem._id === this.state._id)[0];
      let newState = location;
      newState.dataSource = ds.cloneWithRows(location.times);
      this.setState(newState);
      return locations;
    })
    .catch(alert);
  }

  componentWillMount() {
    return this.setState({
      dataSource: ds.cloneWithRows(this.state.times)
    });
  }

  render() {
    let times = this.state.times;
    var timeStr = times.length > 1 ? ' visits' : ' visit';

    return (
      <View style={styles.detailContainer}>
        <Text style={styles.detailViewTitle}>
          {this.state.name}
        </Text>
        <LogDetailEntry header="Address" value={[this.state.street, `${this.state.city}, ${this.state.state}, ${this.state.ZIP}`, this.state.country]}/>
        <LogDetailEntry header="Total time spent here" value={[formatElapTime(this.state.timeSpentMS)]}/>
        <LogDetailEntry header="Total visits" value={[this.state.times.length + timeStr]}/>
        <LogDetailEntry header="Dates visited"/>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={rowData => {
            return (
              <View style={styles.inline}>
                <Text style={styles.detailViewBody}>{formatToDate(rowData.startTime)} at {formatToTime(rowData.startTime)}</Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

export default LogDetailView;
