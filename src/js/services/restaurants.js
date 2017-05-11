angular
  .module('dateApp')
  .service('restaurants', Restaurants);

Restaurants.$inject = ['$http'];
function Restaurants($http) {
  this.getRestaurants = function getRestaurants(lat, lng) {
    return $http
            .get('/api/restaurants', { params: { lat, lng } })
            .then((response) => {
              return response.data;
            });
  };
}
