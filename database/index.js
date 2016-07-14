import Store from 'react-native-store';
import Promise from 'bluebird';

const db = {
	'locations': Store.model('locations'),
	'times': Store.model('times')
}

var secondMS = 1000;
var minuteMS = secondMS * 60;
var hourMS = minuteMS * 60;

var today = new Date();
var todayYear = today.getYear() + 1900;
var todayMonth = today.getMonth();
var todayDay = today.getDay();
var startDate = new Date(todayYear, todayMonth, todayDay, 10, 2, 5);

var locations = [{
		name: 'Freedom Tower',
		coords: {
			latitude: 40.71298780000001,
			longitude: -74.0131151
		},
		street: '285 Fulton St',
		city: 'New York',
		state: 'NY',
		ZIP: 10007,
		country: 'United States',
		timeSpentMS: (1 * hourMS) + (12 * minuteMS)
	}, {
		name: 'Little Italy Pizza',
		coords: {
			latitude: 40.7564807,
			longitude: -73.9814849
		},
		street: '11 Park Pl',
		city: 'New York',
		state: 'NY',
		ZIP: 10007,
		country: 'United States',
		timeSpentMS: 47 * minuteMS
	}, {
		name: 'Empire State Building',
		coords: {
			latitude: 40.7484404,
			longitude: -73.9856554
		},
		street: '350 5th Ave',
		city: 'New York',
		state: 'NY',
		ZIP: 10118,
		country: 'United States',
		timeSpentMS: 56 * minuteMS
	}, {
		name: 'Rockefeller Center',
		coords: {
			latitude: 40.7586101,
			longitude: -73.9782093
		},
		street: '45 Rockefeller Plaza',
		city: 'New York',
		state: 'NY',
		ZIP: 10111,
		country: 'United States',
		timeSpentMS: hourMS + (18 * minuteMS)
	}, {
		name: 'Central Park Zoo',
		coords: {
			latitude: 40.767778,
			longitude: -73.9718335
		},
		street: '64th St and 5th Ave',
		city: 'New York',
		state: 'NY',
		ZIP: 10021,
		country: 'United States',
		timeSpentMS: (2 * hourMS) + (12 * minuteMS)
	}];


var time1 = timeGen(0, startDate.getTime());
var time2 = timeGen(1, time1.endTime.value + 22 * minuteMS);
var time3 = timeGen(2, time2.endTime.value + 28 * minuteMS);
var time4 = timeGen(3, time3.endTime.value + 17 * minuteMS);
var time5 = timeGen(4, time4.endTime.value + 26 * minuteMS);

var times = [time1, time2, time3, time4, time5];

function msToDateObj(timeInMS) {
    var date = new Date(timeInMS);
    return {
      value: timeInMS,
      seconds: date.getSeconds(),
      minutes: date.getMinutes(),
      hours: date.getHours(),
      date: date.getDate(),
      dayOfWk: date.getDay(),
      month: date.getMonth(),
      year: date.getYear() + 1900
    }
}

function timeGen(locationIdx, startTime) {
	return {
		locationId: locationIdx + 1,
		startTime: msToDateObj(startTime),
		endTime: msToDateObj(startTime + locations[locationIdx].timeSpentMS),
		elapsedTime: locations[locationIdx].timeSpentMS
	}
}
function seed() {
	return db.locations.destroy()
	.then(() => db.times.destroy())
	.then(() => Promise.each(locations, location => db.locations.add(location)))
	.then(() => Promise.each(times, time => db.times.add(time)))
	.catch(alert);
}

module.exports = {
	db: db,
	msToDateObj: msToDateObj,
	seed: seed
};