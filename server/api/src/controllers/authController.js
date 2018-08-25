const logger = require('winston');

const { LOGIN, REGISTER } = require('../utils/routerConfig');


module.exports = ({ router, channel }) => {
	router.post(LOGIN.url, async (req, res, next) => {
		try {
			logger.info(`Send to ${LOGIN.name} queue`);
			await channel.assertQueue(LOGIN.name);
			await channel.sendToQueue(LOGIN.name, Buffer.from(JSON.stringify(req.body), 'utf8'));
			await channel.assertQueue(LOGIN.consume);
			channel.consume(LOGIN.consume, (msg) => {
				logger.info(`Consume ${LOGIN.consume}`);
				const result = JSON.parse(msg.content);
				logger.info(`{${LOGIN.consume} Result: ${JSON.stringify(result)}`);
				if(result.error) {
					const { error } = result; 
					return res.status(error.httpStatus).send({ error: error.message });
				}
				res.send(result);
			});
		} catch(e) {
			next(e);
		}
	});

	router.post(REGISTER.url, async (req, res, next) => {
		try {
			logger.info(`Send to ${REGISTER.name} queue`);
			await channel.assertQueue(REGISTER.name);
			await channel.sendToQueue(REGISTER.name, Buffer.from(JSON.stringify(req.body), 'utf8'));
			await channel.assertQueue(REGISTER.consume);
			channel.consume(REGISTER.consume, (msg) => {
				logger.info(`Consume ${REGISTER.consume}`);
				const result = JSON.parse(msg.content);
				logger.info(`${REGISTER.consume} Result: ${JSON.stringify(result)}`);
				if(result.error) {
					const { error } = result; 
					return res.status(error.httpStatus).send({ error: error.message });
				}
				res.send(result);
			});
		} catch(e) {
			next(e);
		}
	});
};