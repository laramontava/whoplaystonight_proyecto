var userscontroller = require('./users.controller');
var passport = require('passport');
module.exports = function (app) {

    app.post('/api/signup', userscontroller.signup);

    app.post('/api/signin', userscontroller.signin);

    app.get('/api/loginFacebook', userscontroller.loginfacebook);
    app.get('/api/auth/facebook/callback', passport.authenticate('facebook',
        { successRedirect: '/socialsignin', failureRedirect: '/signin' }));

    app.post('/api/logout', function (req, res) {
        console.log('logout serverS');
        req.logOut();
        res.redirect('/');
    });

    app.get('/api/loginTwitter', userscontroller.logintwitter);
    app.get('/api/auth/twitter/callback',
        passport.authenticate('twitter', { successRedirect: '/socialsignin', failureRedirect: '/signin' }));

    app.get('/api/loggedin', userscontroller.loggedin);
        //isloggedin
        //req.isAuthenticated()?res.json(req.user):'0';
    app.get('/api/auth/success', userscontroller.success);

    app.get('/api/verifyaccount', userscontroller.verifyaccount);

    app.post('/api/updateprofile', userscontroller.updateprofile);

    app.post('/api/uploadavatar', userscontroller.uploadavatar);

    app.post('/api/eventsprofile', userscontroller.getEventsProfile);

    app.post('/api/recoverpassword', userscontroller.recoverpassword);

    app.get('/api/changepassword', userscontroller.changepassword);

    app.post('/api/changepasswordbd', userscontroller.changepasswordbd);
};
