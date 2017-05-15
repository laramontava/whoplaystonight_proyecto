(function () {
  'use strict';

  angular
    .module('app.users')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['logger', 'dataservice', '$state', '$timeout', '$rootScope', '$scope', '$translatePartialLoader','Upload'];
  /* @ngInject */
  function ProfileController(logger, dataservice, $state, $timeout, $rootScope, $scope, $translatePartialLoader, Upload) {
    var datauser = $rootScope.authUser;
    var vm = this;
    if ($rootScope.authUser) {
      vm.name = $rootScope.authUser.name;
      vm.email = $rootScope.authUser.email;
      vm.avatar = datauser.avatar;
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
      return dataservice.getEventsProfile(UserJSON).then(function (data) {
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

    $scope.upload = function (file) {
        document.cookie = "usernameavatar="+datauser.username;
        Upload.upload({
            url: '/api/uploadavatar',
            data: {file: file, 'username': datauser.username}
            
        }).then(function (resp) {
            logger.success('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            logger.error('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            logger.success('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
  }
})();
