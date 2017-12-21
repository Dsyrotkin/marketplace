var passport = require('passport');
var User = require('../models/User');
var passportJWT = require("passport-jwt");
var config = require('../config');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.secret
}

var strategy = new JwtStrategy(jwtOptions, function(jwtPayload, next) {
  	console.log('payload received', jwtPayload);
  	var user = User.findOne({_id: jwtPayload._id}, function(err, user) {
		if (user) {
			next(null, user);
		} else {
			next(null, false);
		}
	})
});

passport.serializeUser(function(user, done) {
	done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

passport.use(strategy);

module.exports = passport;