
const { LOGIN, VERIFY_EMAIL, REGISTER, RESET, FORGOT } = require('../utils/routerConfig');


module.exports = ({ router, channel }) => {
	router.post(LOGIN.url, async (req, res, next) => {
		try {
			console.log('USAO', channel);
			await channel.assertQueue(LOGIN.name);
			await channel.sendToQueue(LOGIN.name, Buffer.from(JSON.stringify(req.body), 'utf8'));
			await channel.assertQueue(LOGIN.consume);
			channel.consume(LOGIN.consume, (msg) => {
				console.log(msg.content.toString());
			});
		} catch(e) {
			next(e);
		}
	});

	router.post(REGISTER.url, async (req, res, next) => {
		try {
			await channel.assertQueue(REGISTER.name);
			await channel.sendToQueue(REGISTER.name, Buffer.from(req, 'utf8'));
			await channel.assertQueue(REGISTER.consume);
			channel.consume(REGISTER.consume, (msg) => {
				console.log(msg.content.toString());
			});
		} catch(e) {
			next(e);
		}
	});

	router.post(FORGOT.url, async (req, res, next) => {
		try {
			await channel.assertQueue(FORGOT.name);
			await channel.sendToQueue(FORGOT.name, Buffer.from(req, 'utf8'));
			await channel.assertQueue(FORGOT.consume);
			channel.consume(FORGOT.consume, (msg) => {
				console.log(msg.content.toString());
			});
		} catch(e) {
			next(e);
		}
	});

	router.post(RESET.url, async (req, res, next) => {
		try {
			await channel.assertQueue(RESET.name);
			await channel.sendToQueue(RESET.name, Buffer.from(req, 'utf8'));
			await channel.assertQueue(RESET.consume);
			channel.consume(RESET.consume, (msg) => {
				console.log(msg.content.toString());
			});
		} catch(e) {
			next(e);
		}
    });
    
    router.get(VERIFY_EMAIL.url, async (req, res, next) => {
		try {
			await channel.assertQueue(VERIFY_EMAIL.name);
			await channel.sendToQueue(VERIFY_EMAIL.name, Buffer.from(req, 'utf8'));
			await channel.assertQueue(VERIFY_EMAIL.consume);
			channel.consume(VERIFY_EMAIL.consume, (msg) => {
				console.log(msg.content.toString());
			});
		} catch(e) {
			next(e);
		}
	});

	router.post(VERIFY_EMAIL.url, async (req, res, next) => {
		try {
			await channel.assertQueue(VERIFY_EMAIL.name);
			await channel.sendToQueue(VERIFY_EMAIL.name, Buffer.from(req, 'utf8'));
			await channel.assertQueue(VERIFY_EMAIL.consume);
			channel.consume(VERIFY_EMAIL.consume, (msg) => {
				console.log(msg.content.toString());
			});
		} catch(e) {
			next(e);
		}
	});
};