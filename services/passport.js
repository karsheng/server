const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Setup option for JWT Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
	// See if the user ID in the payload exists in our database
	// if it does, call 'done' with that user
	// otherwise, call done without user object
	User.findById(payload.sub, function(err, user) {
		// second argument should be user object,
		// but null here since there's an error
		if (err) { return done(err, false); } 

		if (user) {
			done(null, user);
		} else {
			done(null, false);
		}
	});
});

// Tell passport to use this strategy
passport.use(jwtLogin);