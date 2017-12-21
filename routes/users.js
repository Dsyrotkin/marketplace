var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var config = require('../config');
var User = require('../models/User');
var bodyParser = require("body-parser");
var morgan = require("morgan");
var LocalStrategy = require('passport-local').Strategy;

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

mongoose.connect(config.database, {
    useMongoClient: true,
});

function getTokenFromHeader(req){
	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') {
		return req.headers.authorization.split(' ')[1];
	}

	return null;
}

router.get('/setup', function(req, res) {
	
	  var user = new User({ 
		username: 'test', 
		email: 'test@gmail.com',
		password: 'test',
		firstName: 'John',
		lastName: 'Smith',
		registrationDate: '11/11/2007'
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

router.post('/login', function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (!user) {
				console.log('123');
				res.json({
					type: false,
					data: 'Incorrect username.'
				});
			}

			let checkPasswords = user.comparePassword(req.body.password);
			if (checkPasswords) {
				user.token = user.generateJWT();
				res.json(user);
			} else {
				res.json({
					type: false,
					data: 'Incorrect password.'
				});
			}
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
                    user.token = user.generateJWT();
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

router.get('/:username', function(req, res, next){
    User.findOne({username: req.params.username}, function(err, data){
        res.send(data);
    });
});

router.post('/:username', function(req, res, next){

    User.findOneAndUpdate({username: req.params.username}, req.body, function(err, data){
        if (err) res.send(JSON.stringify(err));
        console.log('User successfully updated!');
        res.send(JSON.stringify(data));
    });

});

router.delete('/:username', function(req, res, next){
    User.findByIdAndRemove({username: req.params.username}, function(err, data){
        if (err) throw err;
        console.log('User successfully removed!');
        res.send(JSON.stringify(data));
    });
});

module.exports = router;
