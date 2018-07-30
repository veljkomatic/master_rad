const jwt = require('jsonwebtoken');

const errorCode = require('../utils/errorCodes');
const keys = require('../config/keys');

module.exports = {
	validResetToken: (ctx) => {
		return new Promise((resolve, reject) => {
			const token = ctx.eal_sig;
			if (!token) {
				return reject(errorCode.UNAUTHORIZED);
			}
			jwt.verify(token, keys.secret, (err, decoded) => {
				if (err) {
					return reject(errorCode.UNAUTHORIZED);
				} else if (decoded && decoded.reset_token) {
					ctx.userId = decoded.user_id;
					return resolve();
				}
				return reject(errorCode.UNAUTHORIZED);
			});
		});
	},
	validVerifyToken: (ctx) => {
		return new Promise((resolve, reject) => {
			const token = ctx.verify_sig;
			if (!token) {
				return reject(errorCode.UNAUTHORIZED);
			}
			jwt.verify(token, keys.secret, (err, decoded) => {
				if (err) {
					return reject(errorCode.UNAUTHORIZED);
				} else if (decoded && decoded.verify_token) {
					ctx.userId = decoded.user_id;
					return resolve();
				}
				return reject(errorCode.UNAUTHORIZED);
			});
		});
	}
};