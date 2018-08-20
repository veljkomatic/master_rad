const jwt = require('jsonwebtoken');

const keys = require('../../config/keys');

module.exports = {
	validUser: (token) => {
		jwt.verify(token, keys.secret, (err, decoded) => {
			if (err) {
                throw { error: 'Not valid token'}
			}
		});
	}
};