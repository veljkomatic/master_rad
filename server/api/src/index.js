const httpServer = require('./config/app');

const server = httpServer.listen(3000);

server.on('listening', async () => {
    console.log('Application started 3000')
});