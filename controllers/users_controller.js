const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const passport = require('passport');
// Load User model
const User = require('../models/User');

router.get('/login', (req, res) => {
    res.render('login', { layout: 'admin', Id: 'LoginForm' });
});

router.get('/register', (req, res) => res.render('register', { layout: 'admin' }));

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    console.log('render dashboard');
    res.render('dashboard', {
        user: req.user,
        layout: 'admin'
    });
});

router.post('/register', (req, res) => {
    const { name, lastname, email, password, password2 } = req.body;

    let errors = [];

    if (!name || !lastname || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields'});
    }

    if (password != password2) {
        error.push({ msg: 'Password do not match.'});
    }

    if (password.length < 6) {
        error.push({ msg: 'Password must be at least 6 characters.'});
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            lastname,
            email,
            password,
            password2
        }, { layout: 'admin' });
    } else {
        User.findByEmail(email, (user) => {
            if (!user || user.length === 0) {
                console.log('user not found so lets create.');
                const newUser = {
                    name: name,
                    lastname: lastname,
                    email: email,
                    password: password
                };
                User.createUser(newUser, (user)=>{
                    if (!user) return;
                    // req.flash('success_msg',
                    // 'You are now registered and can log in');
                    res.redirect('/user/login');
                });
            } else {
                console.log('user already exists.');
                errors.push({ msg: 'E-mail already exists'});
                res.render('register', {
                    errors,
                    name,
                    lastname,
                    email,
                    password,
                    password2
                }, { layout: 'admin' });
            }
        });
    }
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/user/dashboard',
    failureRedirect: '/user/login',
    failureFlash: true}) , (req, res, next) => {
        console.log("Hit the Login ROUTE")
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/logout', (req, res) => {
    req.logout();
    // req.flash('success_msg', 'You are logged out!');
    res.redirect('/user/login');
});

module.exports = router;