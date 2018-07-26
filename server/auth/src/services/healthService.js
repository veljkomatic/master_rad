const logger = require('winston');
const mongoose = require('mongoose');

module.exports = {
	healthGet(req, res) {
		logger.info('GET health endpoint');
		const healthStatus = { status: 'UP' };
		try {
			healthStatus.gitSha = require('../../private/git-sha.json').gitSha;
			healthStatus.gitDistance = require('../../private/git-sha.json').gitDistance;
		} catch (err) {
			healthStatus.gitSha = 'UNKNOWN';
			healthStatus.status = 'DOWN';
		}
		if (mongoose.connection.readyState === 1) {
			healthStatus.mongodb = 'UP';
		} else {
			healthStatus.mongodb = 'DOWN';
			healthStatus.status = 'DOWN';
		}

		if (healthStatus.status === 'UP') {
			res.status(200).json(healthStatus);
		} else {
			res.status(400).json(healthStatus);
		}
	}
};
