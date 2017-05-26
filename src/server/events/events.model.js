var connection = require('../config/config.db.js');

var eventsModel = {};

eventsModel.addEvent = function (event, callback) {
    if (connection) {
        var queryinsert = 'INSERT INTO event ( band_id, band_name, description, type_event, n_participants, date_event, type_access, date_ticket, openning, start, end, poster, town, creado_por)' +
            'values ("' + event.band_id + '","' + event.name + '","' + event.description + '","' + event.type +
            '","' + event.participants + '","' + event.dateevent + '","' + event.access + '","' + event.dateticket +
            '","' + event.oppeningticket + '","' + event.startevent + '","' + event.endevent + '","' + event.poster +
            '","' + event.town + '","' + event.creadopor + '")';
        connection.query(queryinsert, function (error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, rows);
            }
        });
    }
};

eventsModel.geteventssearch = function (info, callback) {
    if (connection) {
        var query = 'SELECT * FROM event WHERE type_event = "' + info + '"';
        connection.query(query, function (error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, rows);
            }
        });
    }
}
module.exports = eventsModel;
