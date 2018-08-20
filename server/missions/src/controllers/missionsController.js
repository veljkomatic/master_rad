const logger = require('winston');

const missionsServices = require('../services/missionsServices');
const authentication = require('../services/authentication');

module.exports = async ({ channel }) => {
	channel.consume('missionsSubscribe', async (msg) => {
		try {
			const token = JSON.parse(msg.content);
			authentication.validUser(token);
			await channel.assertQueue('finishedMission');
			await channel.assertQueue('startingMission');
			setInterval(() => {
				missionsServices.findStartingMissons({ channel });
				missionsServices.findFinishedMissions({ channel });
			}, 1000)
		} catch(e) {
			logger.error('Error missions microservice: ', e);
		}
	});
};