const logger = require('winston');

module.exports = (err) => {
	if (!err) {
		return null;
	} else if (!err.httpStatus) {
		logger.info('unknow error', err.message);
		if (typeof err === 'object') {
			const additionalInfo = { httpStatus: 400, message: err.message };
			return additionalInfo;
		}
		return { httpStatus: 400, message: 'Bad request' };
	}
	return err;
};