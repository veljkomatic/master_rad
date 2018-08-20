const authService = require('../services/authService');
const sanatize = require('../services/sanitizing');
const errorMap = require('../config/errorMap');

module.exports = async ({ channel }) => {
	channel.consume('login', async (msg) => {
		await channel.assertQueue('loginResponse');
		try {
			const ctx = sanatize.login(JSON.parse(msg.content));
			const login = await authService.loginPost(ctx);
			return channel.sendToQueue('loginResponse', Buffer.from(JSON.stringify(login), 'utf8'));
		} catch(e) {
			const error = errorMap(e);
			return channel.sendToQueue('loginResponse', Buffer.from(JSON.stringify({ error }), 'utf8'));
		}
	});

	channel.consume('register', async (msg) => {
		await channel.assertQueue('registerResponse');
		await channel.assertQueue('emailSend');
		try {
			const ctx = sanatize.register(JSON.parse(msg.content));
			const registered = await authService.registerPost(ctx);
			channel.sendToQueue('sendEmail', Buffer.from(JSON.stringify({
				userEmail: registered.email,
				subject: 'Welcome',
				fileName: 'welcome_email',
				data: {
					user: `${registered.firstName} ${registered.lastName}`
				}
			}), 'utf8'));
			return channel.sendToQueue('registerResponse', Buffer.from(JSON.stringify(registered), 'utf8'));
		} catch(e) {
			const error = errorMap(e);
			return channel.sendToQueue('registerResponse', Buffer.from(JSON.stringify({ error }), 'utf8'));
		}
	});
};