const missionsServices = require('../services/missionsServices');

module.exports = async ({ channel }) => {
	channel.consume('missionsSubscribe', async (msg) => {
		await channel.assertQueue('missionsPublish');
		setInterval(() => {
			const startingMissions = missionsServices.findStartingMissons();
			const finishedMissions = missionsServices.findFinishedMissions();
			return channel.sendToQueue('missionsPublish', Buffer.from(JSON.stringify({ startingMissions, finishedMissions }), 'utf8'));
		}, 1000)
	});
};