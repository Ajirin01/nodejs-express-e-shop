var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var schema = mongoose.Schema;

var userSchema = new schema({
    'username':{
        type: String,
        required: false,
    },
    'password':{
        type: String,
        required: false,
    },
});

userSchema.methods.hashPassword = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
userSchema.methods.comparePassword = function(password,hash){
    return bcrypt.compareSync(password, hash);
}

module.exports = mongoose.model('users', userSchema, 'users')