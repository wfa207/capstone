'use strict';

import Promise from 'bluebird';

import React, { Component } from 'react';
import {
  AsyncStorage,
  TouchableHighlight,
  Navigator,
  Text
} from 'react-native';

import {db, msToDateObj} from '../database';
import {SERVER_ROUTE, GOOGLE} from '../server/env/development';
import styles from '../app/components/styles'

var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

var googKey = GOOGLE.serverKey;

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

  msToDateObj: msToDateObj,

  formatToDate(dateObj) {
    return dayNames[dateObj.dayOfWk] + ', ' + 
      monthNames[dateObj.month] + ' ' +
      dateObj.date + ', ' + 
      dateObj.year;
  },

  formatToTime(dateObj) {
    let minutes = '0' + dateObj.minutes;
    let formattedTime = ((!dateObj.hours || dateObj.hours === 12) ? 12 : (dateObj.hours % 12)) + ':' +
          minutes.substr(-2) + " " + (dateObj.hours < 12 ? "AM" : "PM");
    return formattedTime;
  },

  formatElapTime(elapTime) {
    let units = {
      year: 1000 * 60 * 60 * 24 * 365,
      month: 1000 * 60 * 60 * 24 * 30,
      week: 1000 * 60 * 60 * 24 * 7,
      day: 1000 * 60 * 60 * 24,
      hour: 1000 * 60 * 60,
      minute: 1000 * 60,
      second: 1000
    }

    let res = [];

    if (elapTime === 0) return 'No time spent at this location yet';

    for (var key in units) {
      if (elapTime >= units[key]) {
        let val = Math.floor(elapTime / units[key]);
        res.push(val += ' ' + (val > 1 ? key + 's' : key));
        elapTime = elapTime % units[key];
      }
    }

    return res.length > 1 ? res.join(', ').replace(/,([^,]*)$/,' and'+'$1') : res[0];
  },

  initialDbFetch() {

  },

  getInitialPhotos(locations) {
    return locations.map(location => {
      switch(location.name) {
        case 'Freedom Tower':
          location.url = 'http://nyc-architecture.com/120815/AAGAAR01-09.jpg';
          break;
        case 'Little Italy Pizza':
          location.url = 'http://www.littleitalypizzany.com/nbloom/fckuploads/IMG_0319.JPG';
          break;
        case 'Central Park Zoo':
          location.url = 'http://programs.wcs.org/Portals/176/Images/SocialEvents/CentralParkZoo/central%20park%20zoo%20weddings%202.jpg?ver=2015-12-01-062048-687';
          break;
        case 'Rockefeller Center':
          location.url = 'http://macaulay.cuny.edu/eportfolios/brooks12/files/2012/05/Rockefeller-Center-Office-Space.jpg';
          break;
        case 'Empire State Building':
          location.url = 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Empire_State_Building_by_David_Shankbone_crop.jpg';
          break;
      }
      return location;
    })
  },

  getDbData() {
    let gettingData = [
      db.locations.find(),
      db.times.find()
    ];

    return Promise.each(gettingData, res => res)
    .spread((locations, times) => {
      var assocLocations = locations.map(location => {
        location.times = times.filter(time => {
          return time.locationId === location._id;
        });
        var elapsedTimes = location.times.map(time => time.elapsedTime ? time.elapsedTime : 0);
        location.timeSpentMS = elapsedTimes.reduce((a, b) => {
          return a + b
        });
        return location;
      });
      return assocLocations;
    });
  },  

  addUpdateTime(location, start, timeValue) {
    if (start) {
      return db.times.add({
        locationId: location._id,
        startTime: utils.msToDateObj(timeValue),
      });
    } else {
      return db.times.find()
      .then(times => {
        var lastTime = times[times.length-1];
        var startTime = lastTime.startTime.value;
        return db.times.updateById({
          endTime: utils.msToDateObj(timeValue),
          elapsedTime: timeValue - startTime
        }, lastTime._id);
      })
    }
  },

  addLocation(location) {
    return db.locations.add(location);
  },

  serverFetch(url) {
    return fetch(url)
    .then(res => res.json());
  },

  listFormatter() {
    var args = [].slice.call(arguments);
    var output = [];
    for (var i = 0; i < args.length; i++) {
      if (args[i]) output.push(args[i])
    }
    return output;
  },

  nearbySearch(position, queryName) {
    var searchURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
    var serverKey = 'key=' + googKey;
    var location = 'location=' + position.coords.latitude + ',' + position.coords.longitude;
    var radius = 'radius=5';
    queryName = queryName ? 'name=' + queryName.split(' ').join('|') : undefined;
    var fullURL = searchURL + utils.listFormatter(location, radius, serverKey, queryName).join('&');

    return utils.serverFetch(fullURL)
    .then(data => {
      return data.results;
    });
  },

  getAddress(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var searchURL = 'https://maps.googleapis.com/maps/api/geocode/json?'
    var serverKey = 'key=' + googKey;
    var latlng = 'latlng=' + lat + ',' + long;
    var fullURL = searchURL + utils.listFormatter(latlng, serverKey).join('&');

    return utils.serverFetch(fullURL)
    .then(data => {
      return data.results;
    })
  },

  getPhotoURL(locations) {
    let photo;
    for (let i = 0; i < locations.length; i++) {
      if (locations[i].photos) {
        photo = locations[i].photos[0];
        break;
      }
    }
    if (!photo) return;
    let searchURL = 'https://maps.googleapis.com/maps/api/place/photo?';
    let serverKey = 'key=' + GOOGLE.serverKey;
    let photoReference = 'photoreference=' + photo.photo_reference;
    let maxwidth = 'maxwidth=' + 300;
    let maxheight = 'maxheight=' + 300;
    let fullURL = searchURL + utils.listFormatter(serverKey, photoReference, maxwidth, maxheight).join('&');
    return fetch(fullURL)
    .then(response => {
      return response.url;
    })
  },

}

module.exports = utils;