const amqplib = require('amqplib');

const authController = require('./authController');
const missionsController = require('./missionsController');

module.exports = async globals => {
	const { router, io } = globals;
	const con = await amqplib.connect('amqp://localhost');
	const channel = await con.createChannel();
	return [
		authController({ router , channel }),
		missionsController({ io, channel })
	]
}