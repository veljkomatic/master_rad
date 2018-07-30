const amqplib = require('amqplib');

const authController = require('./authController');
const healthController = require('./healthController');

module.exports = async (app) => {
	const con = await amqplib.connect('amqp://localhost');
	const channel = await con.createChannel();
	await channel.assertQueue('login');
	await channel.assertQueue('register');
	await channel.assertQueue('forgot');
	await channel.assertQueue('reset');
	await channel.assertQueue('send_verify_email');
	await channel.assertQueue('verify_email');
	return [
		authController({ channel }),
		healthController({ router: app })
	];
};