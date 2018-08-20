const emailService = require('../services/emailService');

module.exports = async ({ channel }) => {
	channel.consume('sendEmail', async (msg) => {
		const { userEmail, subject, fileName, data } = JSON.parse(msg.content)
		await emailService.sendEmailToUser(userEmail, subject, fileName, data);
	});
};