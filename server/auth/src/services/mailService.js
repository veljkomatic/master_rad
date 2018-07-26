const emailClient = require('../utils/emailClient');
const jwt = require('jsonwebtoken');

module.exports = {
    sendVerifyEmail: async (user) => {
		if (user.emails[0].verified) {
            return { success: true, verified: true, message: 'Already verified' }
		}
		const verifyEmailToken = jwt.sign({ user_id: user._id, verify_token: true }, process.env.SECRET, {
			expiresIn: 60 * 60 * 24 * 60
		});
		return emailClient.sendEmailToUser(
            user.emails[0].address,
            'Verify Email',
            'verify_email',
            {
                verifyURL: `${verifyAddress}verify_sig=${verifyEmailToken}`
            }
        );
	},
	sendForgotPasswordEmail(user) {
		const token = jwt.sign({ user_id: user._id, reset_token: true }, process.env.SECRET, {
			expiresIn: 60 * 60
		});
		const resetAddress = `${process.env.BASE_URL}/reset?`;
		return emailClient.sendEmailToUser(
            user.emails[0].address,
            'Password Recovery',
            'reset_password_email',
            {
                resetURL: `${resetAddress}eal_sig=${token}`
            },
        );
	}
};
