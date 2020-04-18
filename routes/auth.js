var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var users = require('../db/Users');

var hashPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}
module.exports = function(passport){
    
    router.post('/signup', function(req, res){
        var username = req.body.username;
        var password = req.body.password;

        var hash =  hashPassword(password)
            users.create({
                username:username,
                password:hash
            });
            
            res.redirect('/');
        })
    
    router.post('/login', passport.authenticate('local', {
        failureRedirect:'/login',
        successRedirect:'/',
        
    }));
    return router;
}