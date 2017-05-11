/* global google: true*/
angular
  .module('dateApp')
  .directive('restaurantMap', restaurantMap);

restaurantMap.$inject = ['$window'];
function restaurantMap($window) {
  const directive = {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '=',
      restaurants: '=',
      date: '=',
      selected: '=',
      lat: '=',
      lng: '=',
      name: '='
    },
    link($scope, element) {


      let infoWindow = null;
      const radius = 2000;
      let marker = null;

      const cinemaLatLng = { lat: $scope.date.cinema.lat, lng: $scope.date.cinema.lng };
      const markers = [];

      const map = new $window.google.maps.Map(element[0], {
        zoom: 13,
        center: cinemaLatLng,
        scrollwheel: false
      });
      const circle = new google.maps.Circle({
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 1.5,
        fillColor: '#0000FF',
        fillOpacity: 0.2,
        map: map,
        center: cinemaLatLng,
        radius: radius
      });

      const restaurants = $scope.restaurants.slice(20,35);

      function addRestaurants() {
        restaurants.forEach(function(restaurant){
          // console.log('restaurant', restaurant);
          restaurant.latitude = restaurant.geometry.location.lat;
          restaurant.longitude = restaurant.geometry.location.lng;

          addMarker(restaurant);
        });
      }

      $scope.$watch('restaurants', addRestaurants);


      function addMarker(restaurant) {
        const latLng = { lat: restaurant.latitude, lng: restaurant.longitude };
        marker = new google.maps.Marker({
          position: latLng,
          map
        });

        markers.push(marker);

        const htmlElement = `<div id="infoWindow">
                              <img src="${restaurant.icon}">
                              <h3>${restaurant.name}</h3>
                              <p>${restaurant.vicinity}</p>
                              <p>${'&star;'.repeat(restaurant.rating)}</p>
                              <a>Select this Restaurant</a>
                             </div>`;

        google.maps.event.addListener(marker, 'click', function () {
          if(infoWindow) infoWindow.close();
          infoWindow = new google.maps.InfoWindow({
            content: htmlElement
          });

          google.maps.event.addListener(infoWindow, 'domready', () => {
            document.getElementById('infoWindow').onclick = function handleWindowClick() {
              $scope.selected = restaurant;
              $scope.lat = restaurant.latitude;
              $scope.lng = restaurant.longitude;
              $scope.name = restaurant.name;
              $scope.$apply();
            };

          });
          infoWindow.open(map, this);
        });
      }
    }
  };

  return directive;
}
