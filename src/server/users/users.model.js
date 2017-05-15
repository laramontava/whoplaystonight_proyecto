var connection = require('../config/config.db.js');

var usersModel = {};

usersModel.countUsers = function (username, callback) {
    if (connection) {
        var query = 'SELECT COUNT(*) as total FROM users WHERE username like "' + username + '"';
        connection.query(query, function (error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, rows);
            }
        });
    }
};

usersModel.addUserDB = function (user, callback) {
    if (connection) {
        var queryinsert = 'INSERT INTO users ( username, email, name, password, type, avatar, activated, token )' +
            'values ("' + user.username + '","' + user.email +
            '","' + user.name + '","' + user.password + '","' + user.type + '","' + user.avatar +
            '","' + user.activated + '","' + user.token + '")';
        connection.query(queryinsert, function (error, rows) {
            if (error) {
                console.log('error insert db');
                throw error;
            } else {
                console.log('insertado correctamente');
                callback(null, rows);
            }
        });
    }
};

usersModel.getUser = function (user, callback) {
    if (connection) {
        //var sql = 'SELECT * FROM users WHERE id = ' + id;
        //'SELECT * FROM users WHERE id =' + id, function (err, rows)
        connection.query('SELECT * FROM users WHERE username like "' + user + '"',
            function (error, row) {
                if (error) {
                    throw error;
                } else {
                    callback(null, row);
                }
            });
    }
};

usersModel.verifyAccount = function (req, callback) {
    if (connection) {
        connection.query('SELECT COUNT(*) as total FROM users WHERE email like "' + req.query.email + '" AND token like "' + req.query.token + '"',
            function (error, row) {
                if (error) {
                    throw error;
                } else {
                    callback(null, row);
                }
            });
    }
};

usersModel.editUserDB = function (userdata, callback) {
    if (connection) {
        connection.query('UPDATE users SET name="' + userdata.name + '", email="' + userdata.email + '" WHERE username="' + userdata.username + '"',
            function (error, row) {
                if (error) {
                    throw error;
                } else {
                    callback(null, row);
                }
            });
    }
};
usersModel.getnewinfo = function (userdata, callback) {
    if (connection) {
        connection.query('SELECT * FROM users WHERE username like "' + userdata.username + '"',
            function (error, row) {
                if (error) {
                    throw error;
                } else {
                    callback(null, row);
                }
            });
    }
}
usersModel.activateAccount = function (info, callback) {
    if (connection) {
        console.log("info:")
        console.log(info.email);
        console.log(info.token);
        connection.query('UPDATE users SET activated=1 WHERE email="' + info.email + '" AND token="' + info.token + '"',
            function (error, row) {
                if (error) {
                    throw error;
                } else {
                    callback(null, row);
                }
            });
    }
}
usersModel.getEventsProfile = function (username, callback) {
    if (connection) {
        var query = 'SELECT * FROM event WHERE creado_por = "' + username + '"';
        connection.query(query, function (error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, rows);
            }
        });
    }
}

usersModel.changeavatar = function (data, callback) {
    if (connection) {
        console.log(data);
        connection.query('UPDATE users SET avatar="' + data.avatar + '" WHERE username="' + data.username + '"',
            function (error, row) {
                if (error) {
                    throw error;
                } else {
                    callback(null, row);
                }
            });
    }
}

module.exports = usersModel;
