const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;



// set up options for Jwt Strategy
const jwtOptions ={
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret

};

//create jwt Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
	// see if the user id in the payload exists in the db. If yes call done with that user or call done without user object
	User.findById(payload.sub, function(err, user){
		if (err) {return done(err, false); }
		if(user){
			done(null,user);
		} else {
			done(null, false);
		}
	});
});


// Tell passport to use this Strategy
passport.use(jwtLogin);