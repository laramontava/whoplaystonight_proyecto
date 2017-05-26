var eventcontroller = require('./events.controller');
module.exports = function (app) {

    app.post('/api/createevent', eventcontroller.createevent);
    app.post('/api/eventssearch', eventcontroller.geteventssearch);

};
