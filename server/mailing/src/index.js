const app = require('./config/app');

const server = app.listen(process.env.SERVICE_PORT_ENV_NAME || 3010);

server.on('listening', () =>
	console.log(`Express application started ${process.env.SERVICE_PORT_ENV_NAME || 3010}`)
);