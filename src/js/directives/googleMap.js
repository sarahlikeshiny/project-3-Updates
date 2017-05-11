angular
  .module('dateApp')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window'];
/* global google */
function googleMap($window) {
  const directive = {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '=',
      cinemas: '=',
      user: '=',
      datePerson: '=',
      radius: '=',
      selected: '=',
      lat: '=',
      lng: '=',
      name: '='
    },
    link($scope, element) {
      console.log('user scope', $scope.user.geometry.lat);
      console.log('date', $scope.datePerson.geometry.lat);

      let infoWindow = null;
      let radius = 4000;
      let marker = null;

      const dateLatLng = { lat: $scope.datePerson.geometry.lat, lng: $scope.datePerson.geometry.lng };
      const userLatLng = { lat: $scope.user.geometry.lat, lng: $scope.user.geometry.lng };
      // const bounds = new $window.google.maps.LatLngBounds(dateLatLng, userLatLng);
      const markers = [];

      $scope.center = google.maps.geometry.spherical.interpolate(new google.maps.LatLng(dateLatLng), new google.maps.LatLng(userLatLng), 0.5);


      const map = new $window.google.maps.Map(element[0], {
        zoom: 12,
        center: $scope.center,
        scrollwheel: false
      });

      const circleUser = new google.maps.Circle({
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 1.5,
        fillColor: '#0000FF',
        fillOpacity: 0.1,
        map: map,
        center: userLatLng,
        radius: radius
      });

      const circleDate = new google.maps.Circle({
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 1.5,
        fillColor: '#0000FF',
        fillOpacity: 0.1,
        map: map,
        center: dateLatLng,
        radius: radius
      });

      function addCinemas() {
        $scope.cinemas.forEach((cinema) => {
          cinema.latitude = cinema.geometry.location.lat;
          cinema.longitude = cinema.geometry.location.lng;
          addMarker(cinema);
          filterMarkers();
        });
      }

      $scope.$watch('cinemas', addCinemas);

      $scope.$watch('radius', updateCircle);

      function updateCircle(){
        radius = parseFloat($scope.radius);
        circleUser.setRadius(radius);
        circleDate.setRadius(radius);
        filterMarkers();
      }

      function filterMarkers() {
        for(var i = 0; i < markers.length; i++){
          if(markers[i].userDistance <= radius && markers[i].dateDistance <= radius){
            markers[i].setMap(map);
          } else{
            markers[i].setMap(null);
          }
        }
      }

      function findDistance(p1, p2){
        return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2)).toFixed(2);
      }

      function addMarker(cinema) {
        const latLng = { lat: cinema.latitude, lng: cinema.longitude };

        marker = new google.maps.Marker({
          position: latLng,
          map,
          animation: google.maps.Animation.DROP,
          userDistance: findDistance(new google.maps.LatLng(userLatLng), new google.maps.LatLng(latLng)),
          dateDistance: findDistance(new google.maps.LatLng(dateLatLng), new google.maps.LatLng(latLng))
          // icon: '/assets/restaurant.svg' // Adding a custom icon
        });

        markers.push(marker);

        const htmlElement = `<div id="infoWindow">
                              <h3>${cinema.name}</h3>
                              <h5>${cinema.vicinity}</h5>
                              <a>Choose this cinema</a>
                            </div>`;

        google.maps.event.addListener(marker, 'click', function() {
          if(infoWindow) infoWindow.close();
          infoWindow = new google.maps.InfoWindow({
            content: htmlElement
          });

          google.maps.event.addListener(infoWindow, 'domready', () => {
            document.getElementById('infoWindow').onclick = function handleWindowClick() {
              $scope.selected = cinema;
              $scope.lat = cinema.latitude;
              $scope.lng = cinema.longitude;
              $scope.name = cinema.name;
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
