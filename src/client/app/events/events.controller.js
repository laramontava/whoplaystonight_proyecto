(function () {
  'use strict';

  angular
    .module('app.events')
    .controller('EventsController', EventsController);

  EventsController.$inject = ['logger', '$rootScope', 'dataservice', '$state'];
  /* @ngInject */
  function EventsController(logger, $rootScope, dataservice, $state) {
    var vm = this;
    vm.title = 'Create Events';
    vm.submitAddEventForm = submitAddEventForm;
    activate();

    function activate() {

    }
    function submitAddEventForm() {
      var dataevent = {
        'name': vm.name,
        'description': vm.description,
        'type': vm.type,
        'participants': vm.participants,
        'dateevent': vm.date,
        'access': vm.access,
        'dateticket': vm.dateticket,
        'oppeningticket': vm.oppeningticket,
        'startevent': vm.startevent,
        'endevent': vm.endevent,
        'town': vm.town,
        'poster': "images/events/events_default_image.jpg",
        'creadopor': $rootScope.authUser.username
      }
      var dataeventJson = JSON.stringify(dataevent);
      console.log(dataeventJson)
      dataservice.CreateEvent(dataeventJson).then(function (response) {
        console.log(response);
        if (response === true) {
          logger.success('Event created correctly');
          $state.go('main');
        } else if (response === 'err') {
          logger.error('Error creating the event, try again later');
          $state.go('main');
        } else {
          logger.error('Server error, try again later');
        }
      });
    }
  }
})();
