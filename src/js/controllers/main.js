angular
  .module('dateApp')
  .controller('MainCtrl', MainCtrl)
  .controller('HomeCtrl', HomeCtrl);

HomeCtrl.$inject = ['$rootScope'];
function HomeCtrl($rootScope){
  const vm = this;
  vm.menuIsOpen = false;

  function stateChange(e, toState) {
    vm.pageName = toState.name;
    vm.menuIsOpen = false;
  }

  $rootScope.$on('$stateChangeStart', stateChange);
}

MainCtrl.$inject = ['$rootScope', '$state', '$auth', 'User'];
function MainCtrl($rootScope, $state, $auth, User) {
  const vm = this;

  vm.isAuthenticated = $auth.isAuthenticated;

  $rootScope.$on('error', (e, err) => {
    vm.stateHasChanged = false;
    vm.message = err.data.message;
    $state.go('login');
  });

  $rootScope.$on('$stateChangeSuccess', () => {
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    vm.isNavCollapsed = true;

    //checks if there's a token
    if($auth.getPayload()) {
      vm.currentUserId = $auth.getPayload().userId;
      vm.currentUser = User.get({ id: vm.currentUserId });
    }
  });

  $rootScope.$on('loggedIn', (e, user) => {
    vm.currentUser = user;
  });

  const protectedStates = [];//put the names of the states you want to protect in here later

  function secureState(e, toState) {
    if(!$auth.isAuthenticated() && protectedStates.includes(toState.name)) {
      e.preventDefault();
      $state.go('login');
      vm.message = 'You must be logged in to go there!';
    }
    vm.pageName = toState.name;
  }

  $rootScope.$on('$stateChangeStart', secureState);

  function logout() {
    vm.currentUser = null;
    $auth.logout();
    $state.go('login');
  }

  vm.logout = logout;
}
