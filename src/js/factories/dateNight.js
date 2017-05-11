angular
  .module('dateApp')
  .factory('DateNight', DateNight);

DateNight.$inject = ['$resource'];
function DateNight($resource) {
  return new $resource('/api/dateNight/:id', { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
