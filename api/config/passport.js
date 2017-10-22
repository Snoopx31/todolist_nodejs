const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  }, (req, email, password, done) => {
    process.nextTick(() => {
      User.findOne({ email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, req.flash('error', 'This email is already taken.'));
        }
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        return newUser.save((err2) => {
          if (err2) {
            return done(null, false, req.flash('error', err2.message));
          }
          return done(null, newUser);
        });
      });
    });
  }));


  passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  }, (req, email, password, done) => {
    User.findOne({ email }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, req.flash('error', 'No user found !'));
      }

      if (!user.validPassword(password)) {
        return done(null, false, req.flash('error', 'Invalid password !'));
      }
      return done(null, user);
    });
  }));
};
