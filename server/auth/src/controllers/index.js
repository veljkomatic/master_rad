const authController = require('./authController');
const healthController = require('./healthController');

module.exports = globals => [
	authController(globals),
	healthController(globals)
];