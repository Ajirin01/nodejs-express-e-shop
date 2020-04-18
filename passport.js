var users = require('./db/Users');
var localStrategy = require('passport-local').Strategy;

module.exports = function(passport){
    passport.serializeUser(function(user, done){
        return done(null, user);
    });
    passport.deserializeUser(function(user, done){
        return done(null, user);
    });

    passport.use(new localStrategy(function(username, password, done){
        users.findOne({username:username}, function(err, doc){
            if(err){
                return done(err)
            }else{
                if(doc){
                    var valid = doc.comparePassword(password, doc.password);
                    if(valid){
                        return done(null,{
                            username: doc.username,
                            password: doc.password
                        });
                    }else{
                        return done(null, false)
                    }
                }
            }
        })
    }))
}