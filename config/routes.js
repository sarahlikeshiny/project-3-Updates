const router = require('express').Router();
const dateNight = require('../controllers/dateNight');
const auth = require('../controllers/auth');
const oauth = require('../controllers/oauth');
const cinema = require('../controllers/cinema');
const film = require('../controllers/film');
const restaurant = require('../controllers/restaurant');
const showtimes = require('../controllers/showtimes');
const imageUpload = require('../lib/imageUpload');
const users = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');

router.route('/dateNight')
  .get(dateNight.index)
  .post(secureRoute, imageUpload, dateNight.create);
  // .post(dateNight.create);

router.route('/dateNight/:id')
  .get(secureRoute, dateNight.show)
  .put(secureRoute, dateNight.update)
  .delete(secureRoute,dateNight.delete);

router.get('/cinemas', cinema.cinemasIntersect);

router.get('/films', film.film);

router.get('/showtimes', showtimes.showtimes);

router.get('/restaurants', restaurant.restaurants);

router.get('/users', users.index);

router.route('/users/:id')
  .get(secureRoute, users.show)
  .delete(secureRoute, users.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/oauth/facebook')
  .post(oauth.facebook);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
