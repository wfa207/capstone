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
    .then((data) => {
      console.log(data);
      chain = data;
      return AsyncStorage.setItem(storageName, JSON.stringify(data));
    })
    .then(() => {
      return chain;
    })
    .catch(console.error);
  }

}

module.exports = utils;
