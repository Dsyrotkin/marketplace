var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var config = require('../config');
var User = require('../models/User');
var initPassport = require('../authenticate').initPassport;
var jwt = require('express-jwt');
var bodyParser = require("body-parser");
var morgan = require("morgan");
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

mongoose.connect(config.database, {
    useMongoClient: true,
});

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
         done(err, user);
    });
});

function getTokenFromHeader(req){
	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') {
		return req.headers.authorization.split(' ')[1];
	}

	return null;
}

var auth = {
	required: jwt({
		secret: config.secret,
		userProperty: 'payload',
		getToken: getTokenFromHeader
	}),
	optional: jwt({
		secret: config.secret,
		userProperty: 'payload',
		credentialsRequired: false,
		getToken: getTokenFromHeader
	})
};

router.get('/setup', function(req, res) {
	
	  var user = new User({ 
		username: 'test', 
		email: 'test@gmail.com',
		password: 'test',
		firstName: 'John',
		lastName: 'Smith',
		registrationDate: '11/11/2007',
		token: 'test_token'
	  });
	
	  user.save(function(err) {
		if (err) throw err;
	
		console.log('User saved successfully');
		res.json({ success: true });
	  });
	});

router.get('/list', function(req, res) {
	User.find({}, function(err, users) {
	  res.json(users);
	});
});

router.post('/authenticate', function(req, res) {
	console.log(req.body.email + " " + req.body.password);
    User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (!user) {
				return done(null, false, { message: 'Incorrect username.' });
			}

			if (user.password != req.body.password) {
				console.log("Wrong password");
				return done(null, false, {alert: 'Incorrect password.'});
			}
			user.token = 'test_token';
			return res.json(user);
        }
	});
});

router.post('/register', function(req, res) {
	User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                res.json({
                    type: false,
                    data: "User already exists!"
                });
            } else {
                var userModel = new User();
                userModel.email = req.body.email;
				userModel.password = req.body.password;
				userModel.username = req.body.username;
				userModel.firstName = req.body.firstName;
				userModel.lastName = req.body.lastName;
				userModel.registrationDate = new Date();
                userModel.save(function(err, user) {
                    user.token = 'test_token';
                    user.save(function(err, user1) {
                        res.json({
                            type: true,
                            data: user1,
                            token: user1.token
                        });
                    });
                })
            }
        }
    });
});

module.exports = router;
