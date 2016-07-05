'use strict';
var db = require('./_db');

require('./models/user')(db);
require('./models/trip')(db);
require('./models/location')(db);
require('./models/day')(db);
require('./models/time')(db);

var User = db.model('user');
var Trip = db.model('trip');
var Location = db.model('location');
var Day = db.model('day');
var Time = db.model('time');

User.hasMany(Trip, {
	constraints: false
});
User.hasMany(Location, {
	constraints: false
});
User.hasMany(Day, {
	constraints: false
});
User.hasMany(Time, {
	constraints: false
});

Trip.belongsTo(User);
Trip.belongsTo(Day, {
	constraints: false
});
// Trip.addScope('defaultScope', {include: [
															// 	{model: User},
															// 	{model: Location, as: 'start', required: true},
															// 	{model: Location, as: 'end', required: true}
															// ]}, {override: true});

Location.belongsTo(User);
Location.belongsToMany(Day, {as: 'day', through: 'location_day'});
Location.hasMany(Time, {
	constraints: false
});

Day.belongsTo(User);
Day.hasMany(Time);
// Day.addScope('defaultScope', {include: [{model: User}, {model: Location}, {model: Time}]}, {override: true});

Time.belongsTo(User);
Time.belongsTo(Location);
Time.belongsTo(Day);
// Time.addScope('defaultScope', {include: [{model: User}, {model: Location}, {model: Day}]}, {override: true});

module.exports = db;
