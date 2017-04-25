(function() {
  'use strict';

  angular
    .module('app.profile')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['logger', '$translatePartialLoader', '$rootScope'];
  /* @ngInject */
  function ProfileController(logger, $translatePartialLoader, $rootScope) {
    var datauser = $rootScope.authUser;
    var vm = this;
    vm.name = $rootScope.authUser.name;
    vm.email = $rootScope.authUser.email;
    vm.avatar = $rootScope.authUser.avatar;
    $translatePartialLoader.addPart('profile');
    vm.title = 'Profile';
     
    activate();

    function activate() {
      console.log(datauser)
    }
  }
})();
