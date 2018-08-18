module.exports = async ({ channel }) => {
	channel.consume('missionsSubscribe', async (msg) => {
		setInterval(() => {

		}, 1000)
	});
};