const rp = require('request-promise');

function film(req, res) {
  // const baseUrl = 'http://api.cinelist.co.uk/search/cinemas/coordinates/';
  const baseUrl = 'http://api.cinelist.co.uk/search/cinemas/coordinates';

  rp({
    method: 'GET',
    // url: `${baseUrl}/${lat}/${lng}`,//lat and lng come form the model...
    url: `${baseUrl}/${req.query.lat}/${req.query.lng}`,
    json: true
  })
  .then((response) => {
    res.status(200).json(response);
  })
  .catch((err) => {
    res.status(500).json(err);
  });
}

module.exports = {
  film
};
