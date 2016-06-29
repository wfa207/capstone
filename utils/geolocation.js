'use strict'

var geoUtils = {
  getCurrentLocation(cb) {
    return navigator.geolocation.getCurrentPosition(
      position => {
        cb(position);
      },
      error => alert(error.mesage),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
}

module.exports = geoUtils;
