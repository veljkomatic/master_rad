const express = require('express');
const bodyParser = require('body-parser');
const httpServer = require('http');
const socketIO = require('socket.io');
const errorMap = require('./errorMap');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use((err, req, res, next) => {
  const e = errorMap(err);
  res.status(e.httpStatus).send({ error: e.message });
});

const server = httpServer.Server(app);
const io = socketIO.listen(httpServer)

require('../controllers')({ router: app, io });

module.exports = server;