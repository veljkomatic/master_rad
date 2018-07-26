const e = require('../utils/errorCodes.js');
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
		return e.GENERAL_ERROR;
	}
	return err;
};