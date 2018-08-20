const amqplib = require('amqplib');

const missionsController = require('./emailController');

module.exports = async () => {
	const con = await amqplib.connect('amqp://localhost');
	const channel = await con.createChannel();
	await channel.assertQueue('sendEmail');
	return [
		missionsController({ channel }),
	];
};