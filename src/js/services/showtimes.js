angular
  .module('dateApp')
  .service('showtimes', Showtimes);

Showtimes.$inject = ['$http'];
function Showtimes($http) {
  this.moviesIndex = function moviesIndex(cinemaId) {
    return $http
            .get('/api/showtimes', { params: { cinemaId }})
            .then((response) => {
              const moviesListing = {};
              moviesListing.movietimes = response.data.listings;
              return moviesListing;
            });

  };

}
