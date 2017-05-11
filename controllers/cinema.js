const rp = require('request-promise');
const Promise = require('bluebird');

function cinemasIntersect(req, res, next) {

  const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  const params = {
    method: 'GET',
    url: baseUrl,
    json: true,
    qs: {
      radius: 5000,
      type: 'movie_theater',
      rankby: '',
      key: 'AIzaSyCiIq5egXSFC2ZNGmM3PiNpSyVLy5iqsP8'
    }
  };

  function getAllResults(lat, lng) {
    params.qs.location = `${lat},${lng}`;
    let allResults = [];
    return new Promise((resolve, reject) => {

      function makeRequest() {
        rp(params)
          .then((response) => {
            if(response.status === 'INVALID_REQUEST') return makeRequest();
            if(response.status !== 'OK') reject(new Error(response.status));

            allResults = allResults.concat(response.results);

            // if(response.next_page_token) {
            //   params.qs.pagetoken = response.next_page_token;
            //   return makeRequest();
            // }

            return resolve(allResults);
          });
      }

      makeRequest();
    });
  }

  Promise.props({
    location: getAllResults(req.query.lat, req.query.lng)
  })
  .then((response) => {
    const resultSet = response.location;
    res.json(resultSet);
  })
  .catch(next);
}

module.exports = {
  cinemasIntersect
};
