angular
  .module('dateApp')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {//homepage - with logo
      url: '/',
      templateUrl: 'js/views/home.html'
    })

    .state('dateNightsIndex', {//index page for all dates created by all users
      url: '/alldates',
      templateUrl: 'js/views/dateNights/index.html',
      controller: 'DateNightsIndexCtrl as dateNightsIndex'
    })
    .state('dateNightsNew', {//new date form page
      url: '/date/new',
      templateUrl: 'js/views/dateNights/new.html',
      controller: 'DateNightsNewCtrl as dateNightsNew'
    })

    .state('dateNightsEdit', {//google maps page
      url: '/date/:id/edit',
      templateUrl: 'js/views/dateNights/edit.html',
      controller: 'DateNightsEditCtrl as dateNightsEdit'
    })

    .state('dateNightsShow', {//shows details of the date record
      url: '/date/:id',
      templateUrl: 'js/views/dateNights/show.html',
      controller: 'DateNightsShowCtrl as dateNightsShow'
    })

    .state('cinemas', {
      url: '/date/:id/addcinema',
      templateUrl: 'js/views/googleMap.html',
      controller: 'CinemaCtrl as cinemas'
    })

    .state('restaurants', {
      url: '/date/:id/findrestaurant',
      templateUrl: 'js/views/restaurantMap.html',
      controller: 'RestaurantCtrl as restaurants'
    })

    .state('usersShow', {
      url: '/users/:id',
      templateUrl: 'js/views/users/show.html',
      controller: 'UsersShowCtrl as usersShow'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'LoginCtrl as login'
    })

    .state('register', {
      url: '/register',
      templateUrl: 'js/views/auth/register.html',
      controller: 'RegisterCtrl as register'
    });


  $urlRouterProvider.otherwise('/login');
}
