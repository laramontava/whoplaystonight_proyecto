var passport = require('passport');
var userModel = require('./users.model');

exports.signup = function (req, res) {
    console.log(res);
    passport.authenticate('local-signup', function (err, user, info) {
        if (err) {
            return res.send('err');
        }
        if (!user) {
            return res.send('name');
        }
        return res.send(true);
    }
    )(req, res);
};

exports.signin = function (req, res, next) {
    console.log(res);
    passport.authenticate('local-login', function (err, user, info) {
        if (err) {
            return res.send('err');
        }
        if (!user && info === "wrongpassword") {
            return res.send('errorcredentials');
        }
        if (info === "notactivated") {
            return res.send('notactivated');
        }
        return res.send(user);
    })(req, res, next);
};
exports.loginfacebook = function (req, res, next) {
    console.log('LogIn Facebook - server > users.controller ----------');
    passport.authenticate('facebook', { scope: ['email', 'public_profile'] })(req, res, next);
};
exports.logintwitter = function (req, res, next) {
    passport.authenticate('twitter')(req, res, next);
};

exports.success = function (req, res) {
    res.json(req.user);
};

exports.loggedin = function (req, res) {
    console.log('LOGGEDIN ' + JSON.stringify(req.user));
    console.log('session ' + JSON.stringify(req.session));
    console.log(req);
    console.log("req.isAuthenticated()");
    res.send(req.isAuthenticated() ? req.user : '0');
};

exports.verifyaccount = function (req, res) {
    console.log("estoy a punto de verificar mi cuenta :D");
    console.log(req.query.token);
    console.log(req.query.email);
    userModel.verifyAccount(req, function (error, rows, callback) {
        console.log('llega a pasar model------------------------');
        console.log(req.query.email)
        console.log(req.query.token)
        console.log(error)
        console.log(rows)
        if (rows[0].total > 0) {
            var infoaccount = {
                email: req.query.email,
                token: req.query.token
            };
            userModel.activateAccount(infoaccount, function (error, rows) {
                console.log(rows)
                console.log(error)
                if (error) {
                    return done(error);
                }
                if (rows) {
                    res.redirect('/');
                }
            });
        } else {
            res.redirect('/signup');
        }
    });
    //passport.authenticate('local-confirmaccount', { query: ['email', 'token'] })(req, res, next);
    /*passport.authenticate('local-confirmaccount', function (err, user, info) {
        console.log("err")
        console.log(err)
        console.log("user")
        console.log(user)
        console.log("info")
        console.log(info)
    }
    )(req, res);*/
};

exports.updateprofile = function (req, res) {
    console.log("actualizar cuenta...............................")
    //console.log(res);
    var edituserinfo = {
        username: areq.body.username,
        email: req.body.email,
        name: req.body.name,
        avatar: req.body.avatar
    };
    console.log(edituserinfo)
    /*passport.authenticate('updateprofile', function (err, user, info) {
        console.log(user)
    }
    )(req, res);*/
    userModel.editUserDB(edituserinfo, function (error, rows) {
        console.log("redultado de editar")
        console.log(rows.changedRows)
        console.log(error)
        if (error || rows.changedRows === 0) {
            return res.send("error");
        }
        if (rows && rows.changedRows > 0) {
            /*userModel.getnewinfo(edituserinfo, function (error, rows){
                console.log("resultado .....................")
                console.log(rows)
                console.log("cogiendo nuevos datos")
                console.log(rows[0])
                if(error){
                    return done(error);
                }
                return res.send(rows);
            });*/
            return res.send(edituserinfo);
        }
    });
};

exports.uploadavatar = function (req, res) {
    console.log("avatar---------------------")
    //var dz = req.dzMethods.getDropzone();
    console.log(req.body);
}