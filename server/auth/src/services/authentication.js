const jwt = require('jsonwebtoken');

const User = require('../models/User');
const errorMap = require('../config/errorMap');
const errorCode = require('../utils/errorCodes');
const keys = require('../config/keys');

module.exports = {
	validResetToken: (req, res, next) => {
		const token = req.query.eal_sig;
		const e = errorMap(errorCode.UNAUTHORIZED);
		if (!token) {
			return res.status(e.httpStatus).send({ error: e.message });
		}
		jwt.verify(token, keys.secret, (err, decoded) => {
			if (err) {
				return res.status(e.httpStatus).send({ error: e.message });
			} else if (decoded && decoded.reset_token) {
				req.userId = decoded.user_id;
				return next();
			}
			res.status(e.httpStatus).send({ error: e.message });
		});
	},
	validVerifyToken: (req, res, next) => {
		const token = req.query.verify_sig;
		const e = errorMap(errorCode.UNAUTHORIZED);
		if (!token) {
			return res.status(e.httpStatus).send({ error: e.message });
		}
		jwt.verify(token, keys.secret, (err, decoded) => {
			if (err) {
				return res.status(e.httpStatus).send({ error: e.message });
			} else if (decoded && decoded.verify_token) {
				req.userId = decoded.user_id;
				return next();
			}
		 	res.status(e.httpStatus).send({ error: e.message });
		});
	}
};