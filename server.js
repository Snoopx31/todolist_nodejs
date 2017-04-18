'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const path = require('path')
const port = process.env.PORT || 5555;

let app = express();

app.set('views', './api/views');
app.set('view engine', 'pug');

require('./api/models/task.model');
mongoose.connect('mongodb://localhost/rest_api');


// Parse application/json
app.use(bodyParser.json());
// Parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))


const routes = require('./api/routes');
let router = express.Router();

app.use('/', router);

router.get('/', (req, res) => {
    res.render('index');
});



routes(router);

app.use((req, res) =>{
    res.status(404).render('error');
});

app.listen(port);
console.log('App started on port : ', port);
