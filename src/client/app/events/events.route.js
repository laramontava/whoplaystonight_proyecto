(function() {
  'use strict';

  angular
    .module('app.events')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'events',
        config: {
          url: '/createevent',
          templateUrl: 'app/events/events.html',
          controller: 'EventsController',
          controllerAs: 'vm',
          title: 'Create Event',
          settings: {
            
          }
        }
      },
      {
        state: 'listevents',
        config: {
          url: '/events:info',
          templateUrl: 'app/events/listevents.html',
          controller: 'EventsListController',
          controllerAs: 'vm',
          title: 'Events'
        }
      }
    ];
  }
})();
