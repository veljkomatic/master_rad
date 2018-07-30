const User = require('../models/User');
const errorCode = require('../utils/errorCodes');
const mailService = require('./mailService');
const bcrypt = require('bcrypt');
const sha256 = require('sha256');
const randtoken = require('rand-token') 

const keys = require('../config/keys');

const generateAuthToken = async (user) => {
	const token = jwt.sign({ _id: user._id }, keys.secret, {
		expiresIn: 60 * 60 * 72 // expires in 72 hours
	});
	const refreshToken = randtoken.uid(256);
	user.services.refreshToken = refreshToken;
	await user.save();
	return  {
		token,
		refreshToken,
		user
	}
};

module.exports = {
	loginPost: async (req) => {
		const { email, password } = req.body;
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
	forgotPost: async (req) => {
		const { email } = req.body;
		const user = await User.find({ "email.address": email });
		if (!user) {
			throw errorCode.USER_NOT_EXISTS;
		}
		return mailService.sendForgotPasswordEmail(user);
	},
	resetPost: async (req) => {
		const userId = req.userId;
		const { password } = req.body;
		const hashedPassword = bcrypt.hashSync(sha256(password), 10);
		const user = await User.find({ _id: userId });
		user.services.password.bcrypt = hashedPassword;
		return user.save();
	},
	registerPost: async (req) => {
		const { email, firstName, lastName, password } = req.body;
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
		mailService.sendVerifyEmail(req.user);
		return newUser;
	},
	verifyEmailPost: (req) => {
		return mailService.sendVerifyEmail(req.user);
	},
	verifyEmailGet: async (req) => {
		const userId = req.userId;
		const user = await User.find({ _id: userId });
		user.email.verified = true;
		return user.save();
	}
};
