const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({
            usernameField: 'email'
        }, (email, password, done) => {
            process.nextTick(function () {
                // Match user
                User.findByEmail(email, (user) => {
                    if (!user || user.length === 0) {
                        console.log('user not found.');
                        return done(null, false, {
                            message: 'That email is not registered'
                        });
                    }

                    // Match password
                    User.verifyPassword(password, user.Password, (err, isMatch) => {
                        console.log('user found match password');
                        console.log("Is password MAtched?", isMatch)
                        if (isMatch) {
                            return done(null, user[0]);
                        } else {
                            return done(null, false, {
                                message: 'Password incorrect'
                            });
                        }
                    });
                });
            });
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.Id);
    });

    passport.deserializeUser(function (user, done) {
        User.findById(user, function (err, user) {
            done(err, user);
        });
    });
};