//====================STARTEGY & MODEL=========================
var LocalStrategy   = require('passport-local').Strategy;
var User       		= require('../models/user');

module.exports = function(passport) {
  //====================PASSPORT SERIALIZATION=========================
    passport.serializeUser(function(user, next) {
        next(null, user.id);
    });
    passport.deserializeUser(function(id, next) {
        User.findById(id, function(err, user) {
            next(err, user);
        });
    });


    //====================SETUP SIGNUP=========================
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
      //====================VERIFY AVAILABLE EMAIL=========================
    function(req, email, password, next) {
        User.findOne({ 'local.email' :  email }, function(err, user) {
            if (err)
                return next(err);
            if (user) {
                return next(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                var newUser = new User();
                newUser.local.email    = email;
                newUser.local.username = req.body.username;
                newUser.local.password = newUser.generateHash(password);
        //====================SAVE USER=========================
                newUser.save(function(err) {
                    if (err) throw err;
                    return next(null, newUser);
                });
            }
        });
    }));

    //====================SETUP LOGIN=========================
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    //====================VERIFY AVAILABLE EMAIL=========================
    function(req, email, password, next) {
        User.findOne({ 'local.email' :  email }, function(err, user) {
            if (err) return next(err);
            if (!user) return next(null, false, req.flash('loginMessage', 'No user found.'));
            if (!user.validPassword(password)) return next(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
          //====================VALID USER=========================
            return next(null, user);
        });

    }));

};
