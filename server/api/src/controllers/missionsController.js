const logger = require('winston');

module.exports = ({ io, channel }) => {
    io.on('connection', async (socket) => {
        await channel.assertQueue('missionsSubscribe');
        await channel.assertQueue('finishedMission');
        await channel.assertQueue('startingMission');
        logger.info('Finished assertQueues: missionsSubscribe, finishedMission, startingMission');
        socket.on('missionsSubscribe', async (token) => {
            try {
                logger.info('Send to queue missionsSubscribe');
                await channel.sendToQueue('missionsSubscribe', Buffer.from(JSON.stringify(token), 'utf8'));
                channel.consume('startingMission', (msg) => {
                    logger.info('Consume startingMission');
                    socket.emit('startingMission', JSON.parse(msg.content))
                });
                channel.consume('finishedMission', (msg) => {
                    logger.info('Consume finishedMission');
                    socket.emit('finishedMission', JSON.parse(msg.content))
                });
            } catch(e) {
            }
        });
    });
};