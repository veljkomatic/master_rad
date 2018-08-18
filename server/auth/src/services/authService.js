
const bcrypt = require('bcrypt');
const sha256 = require('sha256');
const randtoken = require('rand-token') 

const User = require('../models/User');
const errorCode = require('../utils/errorCodes');
const mailService = require('./mailService');
const keys = require('../config/keys');
const sanitize = require('./sanitizing');

const generateAuthToken = async (user) => {
	const token = jwt.sign({ _id: user._id }, keys.secret, {
		expiresIn: 60 * 60 * 72 // expires in 72 hours
	});
	const refreshToken = randtoken.uid(256);
	user.services.refreshToken = refreshToken;
	const updatedUser = await user.save();
	const sanitizedUser = sanitize.sanitizeUser(updatedUser);
	return  {
		token,
		refreshToken,
		user: sanitizedUser
	}
};

module.exports = {
	loginPost: async (ctx) => {
		const { email, password } = ctx;
		const hashedPassword = sha256(password);
		const user = await User.find({ "email.address": email });
		if (!user) {
			throw errorCode.USER_NOT_EXISTS;
		}
		if (!user.email.verified) {
			throw errorCode.USER_NOT_EXISTS;
		}
		const difference = await bcrypt.compare(hashedPassword, user.services.password.bcrypt);
		if (!difference) {
			throw errorCode.NOT_ALLOWED;
		}
		return generateAuthToken(user);
	},
	forgotPost: async (ctx) => {
		const { email } = ctx;
		const user = await User.find({ "email.address": email });
		if (!user) {
			throw errorCode.USER_NOT_EXISTS;
		}
		return mailService.sendForgotPasswordEmail(user);
	},
	resetPost: async (ctx) => {
		const { password, userId } = ctx;
		const hashedPassword = bcrypt.hashSync(sha256(password), 10);
		const user = await User.find({ _id: userId });
		user.services.password.bcrypt = hashedPassword;
		const updatedUser = await user.save();
		return sanitize.sanitizeUser(updatedUser);
	},
	registerPost: async (ctx) => {
		const { email, firstName, lastName, password } = ctx;
		const oldUser = await User.find({ "email.address": email });
		if (oldUser) {
			throw errorCode.REGISTER_USER_EXISTS;
		}
		const hashedPassword = bcrypt.hashSync(sha256(password), 10);
		const userToSave = new User({
            email,
            firstName,
			lastName,
			services: {
				password: {
					bcrypt: hashedPassword
				}
			}
        });
		const newUser = await userToSave.save();
		mailService.sendVerifyEmail(newUser);
		return true;
	},
	verifyEmailPost: (ctx) => {
		const { email } = ctx;
		const user = await User.find({ "email.address": email });
		return mailService.sendVerifyEmail(user);
	},
	verifyEmailGet: async (ctx) => {
		const userId = ctx.userId;
		const user = await User.find({ _id: userId });
		user.email.verified = true;
		const updatedUser = await user.save();
		return sanitize.sanitizeUser(updatedUser);
	}
};
