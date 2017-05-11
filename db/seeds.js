const mongoose = require('mongoose');
const { dbURI } = require('../config/environment');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const User = require('../models/user');
const DateNight = require('../models/dateNight');

User.collection.drop();
DateNight.collection.drop();


User.create([{
  username: 'Ben',
  email: 'ben@ben',
  password: 'p',
  passwordConfirmation: 'p',
  address: 'GA',
  geometry: {
    lat: 51.515256,
    lng: -0.072662
  }
},{
  username: 'Mark D',
  email: 'mark@mark',
  password: 'p',
  passwordConfirmation: 'p',
  address: 'GA',
  geometry: {
    lat: 51.515256,
    lng: -0.072662
  }
},{
  username: 'Connor',
  email: 'connor@connor',
  password: 'p',
  passwordConfirmation: 'p',
  address: 'GA',
  geometry: {
    lat: 51.515256,
    lng: -0.072662
  }
},{
  username: 'Swedish Sam',
  email: 'sam@sam',
  password: 'p',
  passwordConfirmation: 'p',
  address: 'GA',
  geometry: {
    lat: 51.515256,
    lng: -0.072662
  }
},{
  username: 'Guv',
  email: 'guv@guv',
  password: 'p',
  passwordConfirmation: 'p',
  address: 'GA',
  geometry: {
    lat: 51.515256,
    lng: -0.072662
  }
}])
.then((users) => {
  console.log(`${users.length} users created!`);

  return DateNight
  .create([{
    nameOfDate: 'Fab',
    when: 2017-3-25,
    image: '/images/GA/fab.jpg',
    rating: 1,
    comments: 'I hate him',
    createdBy: users[0],
    geometry: {
      lat: 51.52808 ,
      lng: -0.13289
    }
  },{
    nameOfDate: 'Olivia',
    when: 2017-3-25,
    image: '/images/olivia.jpg',
    rating: 5,
    comments: 'Great gal, great film, great food',
    createdBy: users[1],
    geometry: {
      lat: 51.52808 ,
      lng: -0.13289
    }
  },{
    nameOfDate: 'Mark S',
    when: 2017-3-25,
    image: '/images/GA/markS.jpg',
    rating: 4,
    comments: 'was alright',
    createdBy: users[2],
    geometry: {
      lat: 51.52808 ,
      lng: -0.13289
    }
  },{
    nameOfDate: 'Buki',
    when: 2017-3-25,
    image: '/images/GA/buki.jpg',
    rating: 2,
    comments: 'Film was crazy Yo',
    createdBy: users[3],
    geometry: {
      lat: 51.52808 ,
      lng: -0.13289
    }
  },{
    nameOfDate: 'Mark S',
    when: 2017-3-22,
    image: '/images/GA/markS.jpg',
    rating: 5,
    comments: 'Hope the wives dont find out!',
    createdBy: users[4],
    geometry: {
      lat: 51.52808 ,
      lng: -0.13289
    }
  }]);
})

.then((dateNights) => {
  console.log(`${dateNights.length} dateNights created!`);
})
.catch((err) => {
  console.log(err);
})
.finally(() => {
  console.log('Finally!');
  mongoose.connection.close();
});
