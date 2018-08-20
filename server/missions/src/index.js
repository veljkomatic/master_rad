const express = require('express');
const bodyParser = require('body-parser');
const redis = require("redis"),
	client = redis.createClient();
	
const missionsServices = require('./services/missionsServices');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

require('./controllers')();

module.exports = app;

const server = app.listen(3400);

server.on('listening', async () => {
	const greenTaxiTripData = await missionsServices.parseAndSortCsvFile();
	client.set("greenTaxiTripData", JSON.stringify(greenTaxiTripData), redis.print);
	console.log(`Express application started 3400`)
});