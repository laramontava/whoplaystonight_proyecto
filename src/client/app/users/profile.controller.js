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
      vm.events = getEvents();
    } else {
      $state.go('signin');
    }
    $translatePartialLoader.addPart('profile');
    vm.title = 'Profile';

    vm.submitEditProfile = submitEditProfile;
    activate();

    function activate() {
      Dropzone.autoDiscover = false;
    }

    function getEvents() {
      var username = {
        'username': datauser.username
      };
      var UserJSON = JSON.stringify(username);
      console.log("UserJSON")
      console.log(UserJSON)
      console.log('Estic al getEvents del controller');
      return dataservice.getEventsProfile(UserJSON).then(function (data) {
        console.log(data);
        vm.events = data;
        return vm.events;
      });
    }

    function submitEditProfile() {
      var data = {
        'username': datauser.username,
        'password': datauser.password,
        'name': vm.name,
        'email': vm.email,
        'avatar': datauser.avatar
      };

      var dataUserJSON = JSON.stringify(data);
      dataservice.UpdateProfile(dataUserJSON).then(function (response) {
        if (response == "error") {
          logger.error("No se ha podido modificar el perfil");
        }
        if (response) {
          $rootScope.authUser = response.data['0'];
          logger.success("Profile updated!");
        } else {
          logger.error("No se ha podido modificar el perfil");
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
      renameFilename: $rootScope.authUser.username + '-avatar',
      maxFilesize: '10',
      maxFiles: '1'
    };
    vm.dzCallbacks = {};
    vm.dzMethods = {};

  }
})();
