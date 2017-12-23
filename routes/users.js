var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var config = require('../config');
var User = require('../models/User');
var passport = require('../authenticate').passport;

var bodyParser = require("body-parser");
var morgan = require("morgan");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

mongoose.connect(config.database, {
    useMongoClient: true,
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
				res.status(401).json({message:"no such user found"});
			}

			let checkPasswords = user.comparePassword(req.body.password);
			if (checkPasswords) {
				user.token = user.generateJWT();
				res.json({
					username: user.username,
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
					registrationDate: user.registrationDate,
					token: user.token
				});
			} else {
				res.status(401).json({message:"passwords did not match"});
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
                    console.log(user);
                    console.log(err);
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

router.get('/:username', passport.authenticate('jwt', { session: false }), function(req, res, next){
    User.findOne({username: req.params.username}, function(err, data){
        res.send(data);
    });
});

router.post('/:username', passport.authenticate('jwt', { session: false }), function(req, res, next){

    User.findOneAndUpdate({username: req.params.username}, req.body, function(err, data){
        if (err) res.send(JSON.stringify(err));
        console.log('User successfully updated!');
        res.send(JSON.stringify(data));
    });

});

router.delete('/:username', passport.authenticate('jwt', { session: false }), function(req, res, next){
    User.findByIdAndRemove({username: req.params.username}, function(err, data){
        if (err) throw err;
        console.log('User successfully removed!');
        res.send(JSON.stringify(data));
    });
});

module.exports = router;
