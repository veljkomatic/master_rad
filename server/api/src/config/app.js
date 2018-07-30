const express = require('express');
const bodyParser = require('body-parser');
const amqp = require('amqplib/callback_api');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/login', (req, res) => {
  var q = 'tasks';

var open = require('amqplib').connect('amqp://localhost');

// Publisher
open.then(function(conn) {
  return conn.createChannel();
}).then(function(ch) {
  return ch.assertQueue(q).then(function(ok) {
    return ch.sendToQueue(q, Buffer.from('something to do'));
  });
}).catch(console.warn);

// Consumer
open.then(function(conn) {
  return conn.createChannel();
}).then(function(ch) {
  return ch.assertQueue(q).then(function(ok) {
    return ch.consume(q, function(msg) {
      if (msg !== null) {
        console.log(msg.content.toString());
        ch.ack(msg);
      }
    });
  });
}).catch(console.warn);
});

module.exports = app;
