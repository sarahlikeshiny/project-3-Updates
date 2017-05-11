angular
  .module('dateApp')
  .controller('DateNightsIndexCtrl', DateNightsIndexCtrl)
  .controller('DateNightsNewCtrl', DateNightsNewCtrl)
  .controller('DateNightsShowCtrl', DateNightsShowCtrl)
  .controller('DateNightsEditCtrl', DateNightsEditCtrl)
  .controller('DateNightsDeleteCtrl', DateNightsDeleteCtrl);

DateNightsIndexCtrl.$inject = ['DateNight'];
function DateNightsIndexCtrl(DateNight) {
  const vm = this;

  vm.all = DateNight.query();
}

DateNightsNewCtrl.$inject = ['DateNight', '$state'];
function DateNightsNewCtrl(DateNight, $state) {
  const vm = this;
  vm.dateNight = {};

  function dateNightsCreate() {
    DateNight
      .save(vm.dateNight)
      .$promise
      .then(() => $state.go('dateNightsIndex'));
  }

  vm.create = dateNightsCreate;
}

DateNightsShowCtrl.$inject = ['DateNight', '$stateParams', '$state', '$uibModal'];

function DateNightsShowCtrl(DateNight, $stateParams, $state, $uibModal) {
  const vm = this;
  vm.dateNight = DateNight.get($stateParams);

  function openModal(){
    $uibModal.open({
      templateUrl: 'js/views/partials/dateNightDelete.html',
      controller: 'DateNightsDeleteCtrl as dateNightsDelete',
      resolve: {
        currentDateNight: () => {
          return vm.dateNight;
        }
      }
    });
  }
  vm.open = openModal;
}

DateNightsEditCtrl.$inject = ['DateNight', '$stateParams', '$state', '$scope'];
function DateNightsEditCtrl(DateNight, $stateParams, $state, $scope) {
  const vm = this;
  vm.dateNight = {
    cinema: null,
    restaurant: null
  };

  vm.dateNight = DateNight.get($stateParams);

  function dateNightsUpdate() {
    vm.dateNight
      .$update()
      .then(() => $state.go('dateNightsShow', $stateParams));
  }

  vm.update = dateNightsUpdate;

  function addFilm(film, showTime) {
    vm.dateNight.cinema.film = film;
    vm.dateNight.cinema.showTime = showTime;
  }

  vm.addFilm = addFilm;

}

DateNightsDeleteCtrl.inject = ['$uibModalInstance', 'currentDateNight', '$state'];//instance of the modal thats just been opened. The currentBird is the item from resolve
function DateNightsDeleteCtrl($uibModalInstance, currentDateNight, $state) {
  const vm = this;
  vm.dateNight = currentDateNight;

  function closeModal() {
    $uibModalInstance.close();
  }
  vm.close = closeModal;

  function dateNightsDelete() {
    vm.dateNight
      .$remove()
      .then(() => {
        $state.go('dateNightsIndex');
        $uibModalInstance.close();
      });
  }

  vm.delete = dateNightsDelete;

}
