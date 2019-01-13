const orm = require('../config/orm');
const bcrypt = require('bcryptjs');

module.exports.findById = function(id, callback) {
    orm.getUserByObject({Id: id}, function(user) {
        callback(user);
    });
};

module.exports.findByEmail = function(email, callback) {
    orm.getUserByObject({Email: email}, function(user){
        callback(user);
    });
};

module.exports.verifyPassword = function(password, hash, callback) {
    console.log('Compare '+ password + ' with hash ' + hash);
    bcrypt.compare(password, hash, function(err, isMatch){
        if (err) throw err;
        callback(null, isMatch);
    });
};

module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            if (err) throw err;
            newUser.password = hash;
            console.log(newUser);
            orm.createUser(newUser, (user) =>{
                callback(user);
            });
        });
    });
};