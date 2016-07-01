'use strict'

/*
It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in environment files:
--- server/env/*
*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Trip = db.model('trip');
var Location = db.model('location');
var Day = db.model('day');
var Time = db.model('time');
var Promise = require('sequelize').Promise;
var chance = require('chance')(123);

const numUsers = 15;

var users = [
    {
        first_name: 'Jane',
        last_name: 'FSA',
        email: 'testing@fsa.com',
        password: 'password',
        age: 5,
        gender: 'Female',
        isAdmin: false
    },
    {
        first_name: 'Barack',
        last_name: 'Obama',
        email: 'obama@gmail.com',
        password: 'potus',
        age: 54,
        gender: 'Male',
        isAdmin: true
    },
    {
        first_name: 'Mr.',
        last_name: 'Admin',
        email: 'm@m.com',
        password: 'm',
        age: 54,
        gender: 'Male',
        isAdmin: true
    },
];

var seedUsers = function () {
    function generateRandomUser() {
        let name = chance.name().split(' ');
        return {
            first_name: name[0],
            last_name: name[1],
            email: name.join('').toLowerCase()+'@fsa.com',
            password: 'password',
            defaultShipping: chance.address(),
            age: chance.integer({min: 18, max: 70}),
            gender: chance.pickone(['Male', 'Female']),
            isAdmin: chance.bool({likelihood: 30})
        }

    }

    while (users.length <= numUsers) {
        users.push(generateRandomUser());
    }

    let creatingUsers = users.map(userObj => {
        return User.create(userObj);
    });


    return Promise.all(creatingUsers);

};

var locations = [
    {
        name: 'Fullstack Academy',
        coordinates: [40.7050614, -74.00915429999998],
        city: 'New York',
        state: 'NY',
        country: 'United States'
    },
    {
        name: 'Central Park Zoo',
        coordinates: [40.767778, 73.9718335],
        city: 'New York',
        state: 'NY',
        country: 'United States'
    },
    {
        name: 'Empire State Building',
        coordinates: [40.7484404, -73.98565539999998],
        city: 'New York',
        state: 'NY',
        country: 'United States'
    },
    {
        name: 'Freedom Tower',
        coordinates: [40.71323, -74.0133669],
        city: 'New York',
        state: 'NY',
        country: 'United States'
    },
    {
        name: 'Little Italy Pizza',
        coordinates: [40.7564807, -73.9814849],
        city: 'New York',
        state: 'NY',
        country: 'United States'
    }
];

var seedTrips = function() {
    function createItem() {
        return {
            name: chance.word(),
            time_traveled: chance.integer({min: 0, max: 30}),
            description: chance.sentence({words: 15})
        }
    }

    let trips = [];

    for (let i = 0; i < 10; i++) {
        trips.push(createItem());
    }

    let creatingTrips = trips.map(trip => {
        return Trip.create(trip);
    });

    return Promise.all(creatingTrips);
};


var updatedUsers, updatedTrips, updatedLocations, t, l;

db.sync({ force: true })
.then(() => {
    return Promise.all([seedUsers(), seedTrips()]);
})
.spread((_users, _trips) => {
    updatedUsers = _users;
    updatedTrips = _trips;
    function setUserLocations(user) {
        return locations.map(location => {
            return Location.create(location)
            .then(location => {
                return location.setUser(user);
            });
        });
    }

    let creatingListLocations = updatedUsers.map(user => {
        return setUserLocations(user);
    });

    return Promise.all(creatingListLocations);
})
.then(() => {
    function createDay(user) {
        let d, l, index = Math.floor(Math.random()*5);
        return Day.create({
            date: new Date()
        })
        .then(day => {
            return day.setUser(user);
        })
    }

    let creatingDays = updatedUsers.map(user => {
        return createDay(user);
    });

    return Promise.all(creatingDays);
})
.then(days => {
    function createTime(day) {
        return Time.create({
            arrived: new Date(),
            left: new Date()
        })
        .then(time => {
            return time.setDay(day);
        });
    }
    let creatingTimes = days.map(day => {
        return createTime(day);
    })
    return Promise.all(creatingTimes);
})
.then(times => {
    function updateTime(time) {
        return Day.findOne({
            where: {
                id: time.dayId
            }
        })
        .then(day => {
            return User.findOne({
                where: {
                    id: day.userId
                }
            })
        })
        .then(user => {
            return time.setUser(user);
        });
    }
    let updatingTimes = times.map(time => {
        return updateTime(time);
    })
    return Promise.all(updatingTimes);
})
.then(() => {
    let updatingTrips = updatedTrips.map(trip => {
        return trip.setUser(chance.pickone(updatedUsers));
    });
    return Promise.all(updatingTrips);
})
.then(() => {
    console.log(chalk.green('Seed successful!'));
    process.exit(0);
})
.catch(err => {
    console.error(err);
    process.exit(1);
});
