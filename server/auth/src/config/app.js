const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const sanitizing = require('../middlewares/sanitizing');
const authentication = require('../middlewares/authentication');
const keys = require('./keys');

mongoose.connect(keys.mongoURI);
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.post('/login', sanitizing.login);
app.post('/register', sanitizing.register);
app.post('/forgot', sanitizing.forgotPassword);
app.use('/reset', authentication.validResetToken, sanitizing.resetPassword);
app.get('/verify_email', authentication.validVerifyToken);

require('../controllers')({ router: app });


module.exports = app;