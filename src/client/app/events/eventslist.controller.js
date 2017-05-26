(function () {
  'use strict';

  angular
    .module('app.events')
    .controller('EventsListController', EventsListController);

  EventsListController.$inject = ['logger', '$rootScope', 'dataservice', '$state', '$location'];
  /* @ngInject */
  function EventsListController(logger, $rootScope, dataservice, $state, $location) {

    var vm = this;
    vm.title = 'List Events';
    //vm.events = getSearchEvents();
    activate();

    function activate() {

    }
    if ($location.search().info === "allevents") {
      vm.events = getAllEvents();
      function getAllEvents() {
        return dataservice.getEvents().then(function (data) {
          vm.events = data;
          console.log(vm.events);
          return vm.events;
        });
      }
    } 
    if ($location.search().info === "concert") {
      console.log("concert")
      vm.events = getSearchEvents();
      function getSearchEvents() {
        var data = {
          search: "concert"
        }
        var datasearchJSON = JSON.stringify(data);
        console.log(data)
        return dataservice.getSearchEvents(datasearchJSON).then(function (data) {
          vm.events = data;
          return vm.events;
        });
      }
    }
  }
})();
