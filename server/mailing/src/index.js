const app = require('./config/app');

const server = app.listen(3300);

server.on('listening', () =>
	console.log(`Express application started 3300`)
);