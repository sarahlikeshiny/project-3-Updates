const rp = require('request-promise');

function showtimes(req, res) {
  const baseUrl = 'http://api.cinelist.co.uk/get/times/cinema';

  rp({
    method: 'GET',
    url: `${baseUrl}/${req.query.cinemaId}`,//also get cinema id from the film get request.
    qs: {
      //?day=<INT> pass in the date of the date.
    },
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
  showtimes
};
