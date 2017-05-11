angular
  .module('dateApp')
  .controller('UsersIndexCtrl', UsersIndexCtrl)
  .controller('UsersEditCtrl', UsersEditCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl);

UsersIndexCtrl.$inject = ['User'];
function UsersIndexCtrl(User) {
  const vm = this;

  vm.all = User.query();
}

UsersShowCtrl.$inject = ['User', 'DateNight', '$stateParams', '$state'];
function UsersShowCtrl(User, DateNight, $stateParams, $state) {
  const vm = this;
  vm.userDates = [];

  vm.user = User.get($stateParams, (user) => {
    vm.user = user;
    vm.userDates = DateNight.query({ createdBy: user.id });
    console.log(vm.userDates);
  });

  function usersDelete() {
    vm.user
      .$remove()
      .then(() => $state.go('dateNightsIndex'));
  }

  vm.delete = usersDelete;
}

UsersEditCtrl.$inject = ['User', '$stateParams', '$state'];
function UsersEditCtrl(User, $stateParams, $state) {
  const vm = this;

  vm.user = User.get($stateParams);

  function usersUpdate() {
    vm.user
      .$update()
      .then(() => $state.go('usersShow', $stateParams));
  }

  vm.update = usersUpdate;
}
