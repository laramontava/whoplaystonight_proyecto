(function () {
  'use strict';

  angular
    .module('app.users')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['logger', 'dataservice', '$state', '$timeout', '$rootScope', '$scope', '$translatePartialLoader'];
  /* @ngInject */
  function ProfileController(logger, dataservice, $state, $timeout, $rootScope, $scope, $translatePartialLoader) {
    var datauser = $rootScope.authUser;
    var vm = this;
    if ($rootScope.authUser) {
      vm.name = $rootScope.authUser.name;
      vm.email = $rootScope.authUser.email;
      vm.avatar = $rootScope.authUser.avatar;
    } else {
      $state.go('signin');
    }
    $translatePartialLoader.addPart('profile');
    vm.title = 'Profile';

    vm.submitEditProfile = submitEditProfile;
    activate();

    function activate() {
      console.log("datauser")
      console.log(datauser)
      Dropzone.autoDiscover = false;
    }

    function submitEditProfile() {
      var data = {
        'username': datauser.username,
        'name': vm.name,
        'email': vm.email,
        'avatar': datauser.avatar
      };

      var dataUserJSON = JSON.stringify(data);
      dataservice.UpdateProfile(dataUserJSON).then(function (response) {
        console.log(response)
        if (response == true) {
          logger.success("Registered user correctly");
          $timeout(function () {
            $state.go('main');
          }, 1000);
        } else {
          logger.error("An error has occurred");
        }
      });
    }

    $scope.dzOptions = {
      url: '/api/uploadavatar',
      acceptedFiles: 'image/jpeg, images/jpg, image/png',
      addRemoveLinks: true,
      dictDefaultMessage: 'Click to add or drop avatar',
      dictRemoveFile: 'Remove photo',
      dictResponseError: 'Could not upload this photo',
      paramName: 'photo',
      renameFilename: $rootScope.authUser.username+'-avatar',
      maxFilesize: '10',
      maxFiles: '1'
    };
    vm.dzCallbacks = {};
	  vm.dzMethods = {};
    
  }
})();