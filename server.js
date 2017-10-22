const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const csrf = require('csurf');
const flash = require('express-flash');
const passport = require('passport');

const port = process.env.PORT || 5555;

const app = express();

// # DATABASE

require('./api/models/task.model');
require('./api/models/user.model');

mongoose.connect('mongodb://localhost/rest_api');

// # CONF

const passConf = require('./api/config/passport.js');

passConf(passport);

app.set('views', './api/views');
app.set('view engine', 'pug');

app.use(cookieParser('CEAF3FA4-F385-49AA-8FE4-54766A9874F1'));
app.use(session({
  secret: '59B93087-78BC-4EB9-993A-A61FC844F6C9',
  resave: true,
  saveUninitialized: true,
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
// app.use(csrf());

// Parse application/json
app.use(bodyParser.json());
// Parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/* app.use((req, res, next) => {
  res.locals._csrf = req.csrfToken();
  return next();
}) */

// Middleware for passing flash message to all views
app.use((req, res, next) => {
  res.locals.flash = {
    success: req.flash('success'),
    error: req.flash('error'),
  };

  if (req.user) {
    res.locals.user = req.user;
  }
  next();
});

// # ROUTES

const routes = require('./api/routes');

const router = express.Router();

app.use('/', router);

routes(router, passport);

app.use((req, res) => {
  res.status(404).render('error');
});

app.listen(port);
console.log('App started on port : ', port);
