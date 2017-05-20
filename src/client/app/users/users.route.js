(function() {
  'use strict';

  angular
    .module('app.users')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'signup',
        config: {
          url: '/signup',
          templateUrl: 'app/users/signup.html',
          controller: 'SignUpController',
          controllerAs: 'vm',
          title: 'SignUp',
        }
      },
      {
        state: 'signin',
        config: {
          url: '/signin',
          templateUrl: 'app/users/signin.html',
          controller: 'SignUpController',
          controllerAs: 'vm',
          title: 'SignIn',
        }
      },
      {
        state: 'socialsignin',
        config: {
          url: '/socialsignin',
          controller: 'SocialController'
        }
      },
      {
        state: 'profile',
        config: {
          url: '/profile',
          templateUrl: 'app/users/profile.html',
          controller: 'ProfileController',
          controllerAs: 'vm',
          title: 'Profile'/*,
          resolve:{
            loggedin: dataservice.checkLoggedin
          }*/
        }
      },
      {
        state: 'email',
        config: {
          url: '/introduceemail',
          templateUrl: 'app/users/introduceemail.html',
          controller: 'SignUpController',
          controllerAs: 'vm',
          title: 'Introduce Email'
        }
      },
      {
        state: 'changepassword',
        config: {
          url: '/changepassword:email',
          templateUrl: 'app/users/changepassword.html',
          controller: 'SignUpController',
          controllerAs: 'vm',
          title: 'Change Password'
        }
      }
    ];
  }
})();
