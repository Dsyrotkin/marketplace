var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var uniqueValidator = require('mongoose-unique-validator');
var secret = require('../config').secret;
var bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    email: {type: String, unique: true, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
    firstName: String,
    lastName: String,
    registrationDate: Date,
    password: String,
    token: String
});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function(pass) {
    return bcrypt.compareSync(pass, this.password);
};

UserSchema.methods.generateJWT = function() {
    return jwt.sign({ _id: this._id }, secret, { expiresIn: '1h' })
};

module.exports = mongoose.model('User', UserSchema);