const passport = require('passport');
const LocalPassport = require('passport-local');
const User = require('mongoose').model('User');

module.exports = () => {                                                  // username и password
    passport.use(new LocalPassport((username, password, done) => {
        User.findOne({ username: username }).then(user => {
            if (!user) return done(null, false);
            if (!user.authenticate(password)) return done(null, false);
            return done(null, user);
        });
    }));

    passport.serializeUser((user, done) => {                              //ID по user
        if (user) return done(null, user._id);
    });

    passport.deserializeUser((id, done) => {                             // user по ID
        User.findById(id).then(user => {
            if (!user) return done(null, false);
            return done(null, user);        
        });
    });
};
