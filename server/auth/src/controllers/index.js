const amqplib = require('amqplib');

const authController = require('./authController');
const healthController = require('./healthController');

module.exports = async (app) => {
	const con = await amqplib.connect('amqp://localhost');
	const channel = await con.createChannel();
	return [
		authController({ channel }),
		healthController({ router: app })
	];
};