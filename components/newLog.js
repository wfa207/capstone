'use strict'

import React, { Component } from 'react';
import {
  SegmentedControlIOS,
  ListView,
  Text,
  View,
  AsyncStorage,
  Navigator,
  TouchableHighlight
} from 'react-native';
import styles from './styles';

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

//===========================================///

// NAV HELPER FUNCTIONS

///============================================///
function genNavBarMapper(title) {
  return {
    LeftButton(route, navigator, index, navState) {
      if (index > 0) {
        return (
          <TouchableHighlight
          underlayColor="transparent"
          onPress={() => navigator.pop()}>
          <Text style={styles.leftNavButtonText}>Back</Text>
          </TouchableHighlight>
        );
      } else {
        return null;
      }
    },

    RightButton(route, navigator, index, navState) {
      return null;
    },

    Title(route, navigator, index, navState) {
      return <Text style={styles.NavBarTitle}>{title}</Text>;
    },
  }
}

function genNavBar(title) {
  return (
    <Navigator.NavigationBar
    style={styles.navBar}
    routeMapper={genNavBarMapper(title)}/>
  )
}

//===========================================///

// Logs (activities/locations)

///============================================///

var Log = React.createClass({

  getInitialState() {
    return {
      values: ['Activities', 'Locations'],
      value: 'Locations',
      dataSource: ds.cloneWithRows(['row 1', 'row 2'])
    }
  },

  componentDidMount() {
    this.fetchValueData(this.state.value);
    console.log(this);
  },

  _onValueChange(value) {
    this.fetchValueData(value)
    .then(() => {
      this.setState({
        value: value
      });
    })
  },

  fetchValueData(value) {
    value = value.toLowerCase();
    return AsyncStorage.getItem(value)
    .then((items) => {
      items = JSON.parse(items);
      return items;
    })
    .then((items) => {
      this.setState({dataSource: ds.cloneWithRows(items)});
    });
  },

  _navigate(rowData) {
    rowData.type = this.state.value;
    this.props.navigator.push({
      passProps: rowData
    });
  },

  render() {
    return (
      <View style={styles.banner}>
        <SegmentedControlIOS
          style={styles.segmentControl}
          values={this.state.values}
          selectedIndex={this.state.values.indexOf(this.state.value)}
          onValueChange={this._onValueChange}
          tintColor='#48BBEC'
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={rowData=>
            <TouchableHighlight
            onPress={() => this._navigate(rowData)}
            style={styles.rowStyle}>
              <Text>{rowData.name}</Text>
            </TouchableHighlight>}
        />
      </View>
    )
  }
});

class LogDetailView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var isLocation = this.props.type === 'Locations';
    if (isLocation) {
      return (
        <Text style={{marginTop: 120}}>
          {this.props.name}
          {this.props.city}
          {this.props.state}
          {this.props.country}
          {this.props.timeSpent}
        </Text>
      )
    } else {
      return (
        <Text style={{marginTop: 120}}>
          {this.props.name}
          {this.props.description}
          {this.props.time_traveled}
        </Text>
      )
    }
  }
}

//===========================================///

//LOG NAVIGATOR

///============================================///

class LogNav extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
      if (route.name === 'Log Home') {
        return <route.component
        navigator={navigator}
        {...route.passProps}
        />
      } else {
        return <LogDetailView
        navigator={navigator}
        {...route.passProps}/>
      }
  }

  render() {
    return (
      <Navigator
        initialRoute={{
          name: 'Log Home',
          component: Log
        }}
        style={styles.banner}
        renderScene={this.renderScene}
        navigationBar={genNavBar('Log')}
      />
    );
  }
}

module.exports = LogNav;
