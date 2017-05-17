(function () {
  'use strict';

  angular
    .module('app.users')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['logger', 'dataservice', '$state', '$timeout', '$rootScope', '$scope', '$translatePartialLoader', 'Upload'];
  /* @ngInject */
  function ProfileController(logger, dataservice, $state, $timeout, $rootScope, $scope, $translatePartialLoader, Upload) {
    var datauser = $rootScope.authUser;
    var vm = this;
    if ($rootScope.authUser) {
      vm.name = $rootScope.authUser.name;
      vm.email = $rootScope.authUser.email;
      vm.avatar = datauser.avatar;
      vm.events = getEvents();
      vm.limit = 5;
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
      document.cookie = "usernameavatar=" + datauser.username;
      Upload.upload({
        url: '/api/uploadavatar',
        data: { file: file, 'username': datauser.username }

      }).then(function (resp) {
        logger.success('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
      }, function (resp) {
        logger.error('Error status: ' + resp.status);
      }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        logger.success('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    };

    $scope.loadMore = function () {
      var increamented = vm.limit + 5;
      vm.limit = increamented > vm.events.length ? vm.events.length : increamented;
    }


    //====================================
    // Slick 1
    //====================================
    $scope.number1 = [1, 2, 3, 4, 5, 6, 7, 8];
    $scope.slickConfig1Loaded = true;
    $scope.updateNumber1 = function () {
      $scope.slickConfig1Loaded = false;
      $scope.number1[2] = '123';
      $scope.number1.push(Math.floor((Math.random() * 10) + 100));
      $timeout(function () {
        $scope.slickConfig1Loaded = true;
      }, 5);
    };
    $scope.slickCurrentIndex = 0;
    $scope.slickConfig = {
      dots: true,
      autoplay: true,
      initialSlide: 1,
      infinite: true,
      autoplaySpeed: 4000,
      method: {},
      event: {
        beforeChange: function (event, slick, currentSlide, nextSlide) {
          console.log('before change', Math.floor((Math.random() * 10) + 100));
        },
        afterChange: function (event, slick, currentSlide, nextSlide) {
          $scope.slickCurrentIndex = currentSlide;
        },
        breakpoint: function (event, slick, breakpoint) {
          console.log('breakpoint');
        },
        destroy: function (event, slick) {
          console.log('destroy');
        },
        edge: function (event, slick, direction) {
          console.log('edge');
        },
        reInit: function (event, slick) {
          console.log('re-init');
        },
        init: function (event, slick) {
          console.log('init');
        },
        setPosition: function (evnet, slick) {
          console.log('setPosition');
        },
        swipe: function (event, slick, direction) {
          console.log('swipe');
        }
      }
    };
     
  }
})();
