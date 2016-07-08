'use strict'

import {
  AsyncStorage
} from 'react-native';

import {SERVER_ROUTE, GOOGLE} from '../server/env/development';

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
  initialStorePhotos(locations) {
    let photos = [];
    locations.forEach(location => {
      console.log(location)
      switch(location.name) {
        case 'Freedom Tower':
          photos.push({id: location.id, url: 'http://nyc-architecture.com/120815/AAGAAR01-09.jpg'});
          break;
        case 'Little Italy Pizza':
          photos.push({id: location.id, url: 'http://www.littleitalypizzany.com/nbloom/fckuploads/IMG_0319.JPG'});
          break;
        case 'Central Park Zoo':
          photos.push({id: location.id, url: 'http://programs.wcs.org/Portals/176/Images/SocialEvents/CentralParkZoo/central%20park%20zoo%20weddings%202.jpg?ver=2015-12-01-062048-687'});
          break;
        case 'Rockefeller Center':
          photos.push({id: location.id, url: 'http://macaulay.cuny.edu/eportfolios/brooks12/files/2012/05/Rockefeller-Center-Office-Space.jpg'});
          break;
        case 'Empire State Building':
          photos.push({id: location.id, url: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Empire_State_Building_by_David_Shankbone_crop.jpg'});
          break;
      }
    })
    localStore('photos', photos);
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
    return utils.serverFetch(SERVER_ROUTE + route)
    .then(data => {
      chain = data;
      return utils.localStore(storageName, data);
    })
    .then(() => {
      return chain;
    })
    .catch(console.error);
  },

  fetchAllLocations() {
    return utils.localFetch('locations');
  },

  fetchValueData(value) {
    value = value.toLowerCase();
    return utils.localFetch(value);
  },

  serverFetch(url) {
    return fetch(url)
    .then(res => res.json());
  },

  localFetch(keyName) {
    return AsyncStorage.getItem(keyName)
    .then(data => {
      return JSON.parse(data);
    })
  },

  localStore(keyName, data) {
    return AsyncStorage.setItem(keyName, JSON.stringify(data));
  },

  listFormatter() {
    var args = [].slice.call(arguments);
    var output = [];
    for (var i = 0; i < args.length; i++) {
      if (args[i]) output.push(args[i])
    }
    return output;
  },

  nearbySearch(lat, long, queryName) {
    var searchURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?'
    var serverKey = 'key=' + GOOGLE.serverKey;
    var location = 'location=' + lat + ',' + long;
    var radius = 'radius=50';
    var name = queryName || undefined;
    name ? name.split(' ').join('|') : undefined;
    var fullURL = searchURL + utils.listFormatter(location, radius, serverKey).join('&');
    return utils.serverFetch(fullURL)
    .then(data => {
      return data.results;
    });
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

  fetchTimes() {
    let times;
    return utils.localFetch('times')
    .then(_times => {
      times = _times;
      return utils.localFetch('days')
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
