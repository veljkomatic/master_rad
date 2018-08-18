const missionsServices = require('../services/missionsServices');

module.exports = async ({ channel }) => {
	channel.consume('missionsSubscribe', async (msg) => {
		await channel.assertQueue('finishedMission');
		await channel.assertQueue('startingMission');
		setInterval(() => {
			missionsServices.findStartingMissons({ channel });
			missionsServices.findFinishedMissions({ channel });
		}, 1000)
	});
};