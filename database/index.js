import Store from 'react-native-store';
import Promise from 'bluebird';

const db = {
	'locations': Store.model('locations'),
	'days': Store.model('days'),
	'images': Store.model('images')
}

var today = new Date();

var days = ['Sunday' 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

var locations = [{
		name: 'Freedom Tower',
		coords: {
			latitude: 40.71323,
			longitude: -74.0133669
		},
		city: 'New York',
		state: 'NY',
		country: 'United States',
		timeSpent: 0
	}, {
		name: 'Rockefeller Center',
		coords: {
			latitude: 40.7586101,
			longitude: -73.9782093
		},
		city: 'New York',
		state: 'NY',
		country: 'United States',
		timeSpent: 0
	}, {
		name: 'Empire State Building',
		coords: {
			latitude: 40.7484404,
			longitude: -73.9856554
		},
		city: 'New York',
		state: 'NY',
		country: 'United States',
		timeSpent: 0
	}, {
		name: 'Little Italy Pizza',
		coords: {
			latitude: 40.7564807,
			longitude: -73.9814849
		},
		city: 'New York',
		state: 'NY',
		country: 'United States',
		timeSpent: 0
	}, {
		name: 'Central Park Zoo',
		coords: {
			latitude: 40.767778,
			longitude: -73.9718335
		},
		city: 'New York',
		state: 'NY',
		country: 'United States',
		timeSpent: 0
	}];

var day = {
	dateObj: today,
	startTime: today.getTime(),
	dayOfWk: days[today.getDay()],
	month: months[today.getMonth()],
	year: 1900 + today.getYear()
}

db.locations.destroy()
.then(() => db.days.destroy())
.then(() => db.images.destroy())
.then(() => Promise.each(locations, location => db.locations.add(location)))
.then(() => db.days.add({dayOfTheWeek: 'Friday', id: 1}))
.then(() => db.days.find().then(data => console.log(data)))
.catch(console.error);

module.exports = db;