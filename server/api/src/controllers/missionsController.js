module.exports = ({ io, channel }) => {
    io.on('connection', async (socket) => {
        await channel.assertQueue('missionsSubscribe');
        await channel.assertQueue('missionsPublish');
        socket.on('missionsSubscribe', async () => {
            try {
                await channel.sendToQueue('missionsSubscribe');
                channel.consume('missionsPublish', (msg) => {
                    socket.emit('missionsPublish', JSON.parse(msg.content))
                }); 
            } catch(e) {
            }
        });
    });
};