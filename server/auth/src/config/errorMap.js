const logger = require('winston');

const errorCodes = require('../utils/errorCodes');

module.exports = (err) => {
	if (!err) {
		return null;
	} else if (!err.httpStatus) {
		logger.info('unknow error', err.message);
		if (typeof err === 'object') {
			const additionalInfo = { httpStatus: 400, message: err.message };
			return additionalInfo;
		}
		return errorCodes.GENERAL_ERROR;
	}
	return err;
};