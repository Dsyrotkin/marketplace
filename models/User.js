var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var uniqueValidator = require('mongoose-unique-validator');
var secret = require('../config').secret;

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

UserSchema.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

module.exports = mongoose.model('User', UserSchema);