var eventsModel = require('./events.model');

exports.createevent = function (req, res) {
    var eventinfo = {
        band_id: '123123',
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        participants: req.body.participants,
        dateevent: req.body.dateevent,
        access: req.body.access,
        dateticket: req.body.dateticket,
        oppeningticket: req.body.oppeningticket,
        startevent: req.body.startevent,
        endevent: req.body.endevent,
        town: req.body.town,
        poster: 'images/events/events_default_image.jpg',
        creadopor: req.body.creadopor
    }
    console.log(eventinfo);
    eventsModel.addEvent(eventinfo, function (error, rows) {
        console.log(error)
        console.log(rows)
        if (error) {
            return res.send('err');
        }
        if (rows) {
            return res.send(eventinfo);
        }
    });
    
};

exports.geteventssearch = function (req, res) {
    eventsModel.geteventssearch(req.body.search, function (error, data) {
        if (error) {
            res.send(error);
        }
        res.json(200, data);
    });
};