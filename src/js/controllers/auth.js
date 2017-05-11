angular
 .module('dateApp')
 .controller('RegisterCtrl', RegisterCtrl)
 .controller('LoginCtrl', LoginCtrl);

RegisterCtrl.$inject = ['$auth', '$state'];
function RegisterCtrl($auth, $state) {
  const vm = this;
  vm.user = {};

  function submit() {
    if (vm.registerForm.$valid) {
      $auth.signup(vm.user)
        .then(() => $state.go('login'));
    }
  }

  vm.submit = submit;
}

LoginCtrl.$inject = ['$auth', '$state', '$rootScope'];
function LoginCtrl($auth, $state, $rootScope) {
  const vm = this;
  vm.credentials = {};

  function authenticate(service) {
    $auth.authenticate(service)
    .then(() => {
      $state.go('usersShow', { id: $auth.getPayload().userId });
    });
  }

  vm.authenticate = authenticate;

  function submit() {
    if (vm.loginForm.$valid) {
      $auth.login(vm.credentials)
        .then((res) => {
         // console.log('response', res);
          const currentUserId = $auth.getPayload().userId;
         // console.log('userId', currentUserId);
          $rootScope.$broadcast('loggedIn', res.data.user);
         // console.log('user', res.data.user);
          $state.go('usersShow', { id: currentUserId });
        });
    }
  }

  vm.submit = submit;
}
