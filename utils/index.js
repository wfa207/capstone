'use strict'

import {
  AsyncStorage
} from 'react-native';

import {SERVER_ROUTE} from '../server/env/development';

var utils = {
  getCurrentLocation(cb) {
    return navigator.geolocation.getCurrentPosition(
      position => {
        cb(position);
      },
      error => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  },

  initialFetchAndStoreData(route, storageName) {
    return AsyncStorage.getItem(storageName, (data) => {
      if (!JSON.parse(data)) {
        return utils.fetchAndStoreData(route, storageName);
      }
    })
    .catch(console.error);
  },

  fetchAndStoreData(route, storageName) {
    let chain;
    return fetch(SERVER_ROUTE + route)
    .then(res => {
      return res.json();
    })
    .then(data => {
      chain = data;
      return AsyncStorage.setItem(storageName, JSON.stringify(data));
    })
    .then(() => {
      return chain;
    })
    .catch(console.error);
  },

  fetchAllLocations() {
    return AsyncStorage.getItem('locations')
    .then(locations => {
      return JSON.parse(locations);
    });
  },

  fetchValueData(value) {
    value = value.toLowerCase();
    return AsyncStorage.getItem(value)
    .then((items) => {
      items = JSON.parse(items);
      return items;
    });
  },

  fetchTimes() {
    let times;
    return AsyncStorage.getItem('times')
    .then(times => {
      return JSON.parse(times);
    })
    .then(_times => {
      times = _times;
      return AsyncStorage.getItem('days')
    })
    .then(days => {
      return JSON.parse(days);
    })
    .then(days => {
      let today = days.find(day => {
        let date = new Date(day.date);
        return date.getDate() === (new Date()).getDate();
      });
      return today;
    })
    .then(today => {
      let todayTimes = times.filter(time => {
        return time.dayId === today.id;
      });
      return todayTimes;
    });
  }
}

module.exports = utils;
