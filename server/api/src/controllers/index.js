const amqplib = require('amqplib');

const authController = require('./authController');

module.exports = async app => {
	const con = await amqplib.connect('amqp://localhost');
	const channel = await con.createChannel();
	return [
		authController({ router: app, channel }),
	]
}