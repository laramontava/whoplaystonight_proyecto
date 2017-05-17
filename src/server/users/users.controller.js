var passport = require('passport');
var userModel = require('./users.model');
var multer = require('multer');

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
};

exports.updateprofile = function (req, res) {
    console.log("actualizar cuenta...............................")
    //console.log(res);
    var edituserinfo = {
        username: req.body.username,
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
        if (error || rows.changedRows === 0) {
            return res.send("error");
        }
        if (rows && rows.changedRows > 0) {
            userModel.getnewinfo(edituserinfo, function (error, rows) {
                if (error) {
                    return done(error);
                }
                return res.send(rows);
            });
        }
    });
};

var save = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/client/images/avatar');
    },
    filename: function (req, file, cb) {
        cb(null, req.cookies.usernameavatar + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});
var upload = multer({
    storage: save
}).single('file');
exports.uploadavatar = function (req, res) {
    //var dz = req.dzMethods.getDropzone();
    upload(req, res, function (err) {
        if (err) {
            res.json({error_code:1,err_desc:err});
            return;
        } else {
            var edituserinfo = {
                username: req.cookies.usernameavatar,
                avatar: 'images/avatar/'+req.file.filename
            };
            userModel.changeavatar(edituserinfo, function (error, rows) {
                if (error) {
                    return res.send("error");
                }
                res.json({error_code:0,err_desc:null,'path':req.file.destination+'/', 'filename':req.file.filename});
            });
        }
    });
}

exports.getEventsProfile = function (req, res) {
    userModel.getEventsProfile(req.body.username, function (error, data) {
        if (error) {
            res.send(error);
        }
        res.json(200, data);
    });
};

exports.recoverpassword = function (req, res) {
    console.log(req.body);
    userModel.recoverpassword(req.body, function (err, data){
        if(err) {
            res.send(error);
        }
        res.send(200, data);
    });
}