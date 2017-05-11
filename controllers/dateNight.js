const DateNight = require('../models/dateNight');

function indexRoute(req, res, next) {
  DateNight
    .find(req.query)
    .exec()
    .then((dateNights) => res.json(dateNights))
    .catch(next);
}

function createRoute(req, res, next) {

  if(req.file) req.body.image = req.file.filename;
  req.body.createdBy = req.user;

  DateNight
    .create(req.body)
    .then((dateNight) => res.status(201).json(dateNight))
    .catch(next);
}

function showRoute(req, res, next) {
  DateNight
    .findById(req.params.id)
    .exec()
    .then((dateNight) => {
      if(!dateNight) return res.notFound();

      res.json(dateNight);
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  DateNight
    .findById(req.params.id)
    .exec()
    .then((dateNight) => {
      if(!dateNight) return res.notFound();

      for(const field in req.body) {
        dateNight[field] = req.body[field];
      }

      return dateNight.save();
    })
    .then((dateNight) => res.json(dateNight))
    .catch(next);
}

function deleteRoute(req, res, next) {
  DateNight
    .findById(req.params.id)
    .exec()
    .then((dateNight) => {
      if(!dateNight) return res.notFound();

      return dateNight.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
