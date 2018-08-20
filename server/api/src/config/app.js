const app = require('express')();
const bodyParser = require('body-parser');
const httpServer = require('http').Server(app)
const io = require('socket.io').listen(httpServer);;
const cors = require('cors');

const errorMap = require('./errorMap');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors('*'));
app.set('view engine', 'ejs');

app.use((err, req, res, next) => {
  const e = errorMap(err);
  res.status(e.httpStatus).send({ error: e.message });
});

require('../controllers')({ router: app, io });

module.exports = httpServer;