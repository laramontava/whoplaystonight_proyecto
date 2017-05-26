(function() {
  'use strict';

  angular
    .module('app.main')
    .controller('MainController', MainController);

  MainController.$inject = ['logger', '$translatePartialLoader', '$location'];
  /* @ngInject */
  function MainController(logger, $translatePartialLoader, $location) {
    var vm = this;
    vm.searchevents = searchevents;
    $translatePartialLoader.addPart('main');
    vm.title = 'Main';
     
    activate();

    function activate() {
      
    }
    function searchevents() {
      //$location.path('events"?"info='+$( "#selecttype" ).val());
      $location.url("/events").search("info="+$( "#selecttype" ).val());
    }
  }
})();
