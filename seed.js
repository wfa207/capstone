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
        name: 'Rockefeller Center',
        coordinates: [40.7586101, -73.9782093],
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


var updatedUsers, updatedTrips, updatedLocations = [], t, l;

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
                updatedLocations.push(location);
                return location.setUser(user);
            })
        });
    }

    let creatingListLocations = updatedUsers.map(user => {
        return setUserLocations(user);
    });

    return Promise.all(creatingListLocations);
})
.then(_updatedLocations => {
    updatedLocations = _updatedLocations;
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
    function createTime(day, location) {
        let time;
        let dateArrived = new Date();
        let dateLeft = new Date();
        let hourArrived, hourLeft, minuteArrived, minuteLeft, secondArrived, secondLeft;
        switch ((location.id - 1) % 5) {
          case 0:
            hourArrived = 9;
            minuteArrived = 0;
            secondArrived = 0;
            hourLeft = 9;
            minuteLeft = 0;
            secondLeft = 30;
            break;
          case 1:
            hourArrived = 11;
            minuteArrived = 8;
            secondArrived = 0;
            hourLeft = 11;
            minuteLeft = 9;
            secondLeft = 10;
            break;
          case 2:
            hourArrived = 15;
            minuteArrived = 2;
            secondArrived = 10;
            hourLeft = 15;
            minuteLeft = 2;
            secondLeft = 20;
            break;
          case 3:
            hourArrived = 17;
            minuteArrived = 9;
            secondArrived = 10;
            hourLeft = 17;
            minuteLeft = 9;
            secondLeft = 55;
            break;
          case 4:
            hourArrived = 17;
            minuteArrived = 50;
            secondArrived = 5;
            hourLeft = 17;
            minuteLeft = 50;
            secondLeft = 7;
            break;
        }
        dateArrived.setHours(hourArrived);
        dateArrived.setMinutes(minuteArrived);
        dateArrived.setSeconds(secondArrived);
        dateLeft.setHours(hourLeft);
        dateLeft.setMinutes(minuteLeft);
        dateLeft.setSeconds(secondLeft);
        return Time.create({
            arrived: dateArrived,
            left: dateLeft
        })
        .then(time => {
            return time.setDay(day);
        })
        .then(time => {
            return time.setLocation(location);
        });
    }
    let times = [];
    days.forEach(day => {
        updatedLocations.forEach(location => {
            if (location.userId === day.userId)
              times.push({day: day, location: location});
        });
    });
    let creatingTimes = times.map(time => {
        return createTime(time.day, time.location);
    });
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
    console.error(chalk.red(err));
    process.exit(1);
});
