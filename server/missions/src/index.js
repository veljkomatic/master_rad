const express = require('express');
const bodyParser = require('body-parser');

const missionsServices = require('./services/missionsServices');
let greenTaxiTripData;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

require('./controllers');

module.exports = app;

const server = app.listen(process.env.SERVICE_PORT_ENV_NAME || 3010);

server.on('listening', async () =>
	console.log(`Express application started ${process.env.SERVICE_PORT_ENV_NAME || 3010}`)
);