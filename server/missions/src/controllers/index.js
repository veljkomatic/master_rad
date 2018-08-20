const amqplib = require('amqplib');

const missionsController = require('./missionsController');

module.exports = async () => {
	const con = await amqplib.connect('amqp://localhost');
	const channel = await con.createChannel();
	await channel.assertQueue('missionsSubscribe');
	return [
		missionsController({ channel }),
	];
};