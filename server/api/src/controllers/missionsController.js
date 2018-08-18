module.exports = ({ io, channel }) => {
    io.on('connection', async (socket) => {
        await channel.assertQueue('missionsSubscribe');
        await channel.assertQueue('finishedMission');
        await channel.assertQueue('startingMission')
        socket.on('missionsSubscribe', async () => {
            try {
                await channel.sendToQueue('missionsSubscribe');
                channel.consume('startingMission', (msg) => {
                    socket.emit('startingMission', JSON.parse(msg.content))
                });
                channel.consume('finishedMission', (msg) => {
                    socket.emit('finishedMission', JSON.parse(msg.content))
                });
            } catch(e) {
            }
        });
    });
};