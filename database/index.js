import Store from 'react-native-store';
import Promise from 'bluebird';

const db = {
	'locations': Store.model('locations'),
	'times': Store.model('times')
}

var second = 1000;
var minute = second * 60;
var hour = minute * 60;

var today = new Date();
var todayYear = today.getYear();
var todayMonth = today.getMonth();
var todayDay = today.getDay();
var startDate = new Date(todayYear, todayMonth, todayDay, 10, 2, 5);

var locations = [{
		name: 'Freedom Tower',
		coords: {
			latitude: 40.71323,
			longitude: -74.0133669
		},
		city: 'New York',
		state: 'NY',
		country: 'United States',
		timeSpentMS: (1 * hour) + (12 * minute)
	}, {
		name: 'Little Italy Pizza',
		coords: {
			latitude: 40.7564807,
			longitude: -73.9814849
		},
		city: 'New York',
		state: 'NY',
		country: 'United States',
		timeSpentMS: 47 * minute
	}, {
		name: 'Empire State Building',
		coords: {
			latitude: 40.7484404,
			longitude: -73.9856554
		},
		city: 'New York',
		state: 'NY',
		country: 'United States',
		timeSpentMS: 56 * minute
	}, {
		name: 'Rockefeller Center',
		coords: {
			latitude: 40.7586101,
			longitude: -73.9782093
		},
		city: 'New York',
		state: 'NY',
		country: 'United States',
		timeSpentMS: hour + (18 * minute)
	}, {
		name: 'Central Park Zoo',
		coords: {
			latitude: 40.767778,
			longitude: -73.9718335
		},
		city: 'New York',
		state: 'NY',
		country: 'United States',
		timeSpentMS: (2 * hour) + (12 * minute)
	}];


var time1 = timeGen(0, startDate);
var time2 = timeGen(1, startTimeGen(time1, 22 * minute));
var time3 = timeGen(2, startTimeGen(time2, 28 * minute));
var time4 = timeGen(3, startTimeGen(time3, 17 * minute));
var time5 = timeGen(4, startTimeGen(time4, 26 * minute));

var times = [time1, time2, time3, time4, time5];

function timeGen(locationIdx, startTime) {
	return {
		locationId: locationIdx + 1,
		startDateObj: startTime,
		endDateObj: new Date(startTime.getTime() + locations[locationIdx].timeSpentMS)
	}
}

function startTimeGen(timeObj, timeElapsed) {
	return (
		new Date(timeObj.endDateObj.getTime() + timeElapsed)
	)
}

db.locations.destroy()
.then(() => db.times.destroy())
.then(() => db.images.destroy())
.then(() => Promise.each(locations, location => db.locations.add(location)))
.then(() => Promise.each(times, time => db.times.add(time)))
.catch(console.error);

module.exports = db;