const authService = require('../services/authService');
const sanatize = require('../services/sanitizing');
const errorMap = require('../config/errorMap');
const authentication = require('../services/authentication');

module.exports = async ({ channel }) => {
	channel.consume('login', async (msg) => {
		await channel.assertQueue('loginResponse');
		try {
			const ctx = sanatize.login(JSON.parse(msg.content));
			const login = await authService.loginPost(ctx);
			return channel.sendToQueue('loginResponse', Buffer.from(JSON.stringify(login), 'utf8'));
		} catch(e) {
			const error = errorMap(e);
			return channel.sendToQueue('loginResponse', Buffer.from(JSON.stringify(error), 'utf8'));
		}
	});

	channel.consume('register', async (msg) => {
		await channel.assertQueue('registerResponse');
		try {
			const ctx = sanatize.register(JSON.parse(msg.content));
			const registered = await authService.registerPost(ctx);
			return channel.sendToQueue('registerResponse', Buffer.from(JSON.stringify(registered), 'utf8'));
		} catch(e) {
			const error = errorMap(e);
			return channel.sendToQueue('registerResponse', Buffer.from(JSON.stringify(error), 'utf8'));
		}
	});

	channel.consume('forgot', async (msg) => {
		await channel.assertQueue('forgotResponse');
		try {
			const ctx = sanatize.forgotPassword(JSON.parse(msg.content));
			await authService.forgotPost(ctx);
			return channel.sendToQueue('forgotResponse', Buffer.from(JSON.stringify(true), 'utf8'));
		} catch(e) {
			const error = errorMap(e);
			return channel.sendToQueue('forgotResponse', Buffer.from(JSON.stringify(error), 'utf8'));
		}
	});


	channel.consume('reset', async (msg) => {
		await channel.assertQueue('resetResponse');
		try {
			const ctx = sanatize.resetPassword(JSON.parse(msg.content));
			await authentication.validResetToken(ctx);
			await authService.resetPost(ctx);
			return channel.sendToQueue('resetResponse', Buffer.from(JSON.stringify(true), 'utf8'));
		} catch(e) {
			const error = errorMap(e);
			return channel.sendToQueue('resetResponse', Buffer.from(JSON.stringify(error), 'utf8'));
		}
	});


	channel.consume('send_verify_email', async (msg) => {
		await channel.assertQueue('sendVerifyEmailResponse');
		try {
			const ctx = JSON.parse(msg.content);
			const result = await authService.verifyEmailPost(ctx);
			return channel.sendToQueue('sendVerifyEmailResponse', Buffer.from(JSON.stringify(result), 'utf8'));
		} catch(e) {
			const error = errorMap(e);
			return channel.sendToQueue('sendVerifyEmailResponse', Buffer.from(JSON.stringify(error), 'utf8'));
		}
	});

	channel.consume('verify_email', async (msg) => {
		await channel.assertQueue('verifyEmailResponse');
		try {
			const ctx = JSON.parse(msg.content);
			await authentication.validVerifyToken(ctx);
			const verifiedUser = await authService.verifyEmailGet(ctx);
			return channel.sendToQueue('verifyEmailResponse', Buffer.from(JSON.stringify(verifiedUser), 'utf8'));
		} catch(e) {
			const error = errorMap(e);
			return channel.sendToQueue('verifyEmailResponse', Buffer.from(JSON.stringify(error), 'utf8'));
		}
	});
};