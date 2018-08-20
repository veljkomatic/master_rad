const app = require('./config/app');

const server = app.listen(3200);

server.on('listening', () =>
	console.log(`Express application started 3200`)
);