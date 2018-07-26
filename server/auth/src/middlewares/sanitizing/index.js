const checkEmail = (email) => {
	const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_``{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	if(!email || email.length === 0) {
		throw errorCode.EMAIL_MISSING;
	} else if (typeof email !== "string" || !regex.test(email)) {
		throw errorCode.EMAIL_NOT_VALID;
	}
};

const checkPassword = (password) => {
	if (!password || password.length === 0) {
		throw errorCode.PASSWORD_MISSING;
	} else if (typeof password !== "string" || password.length < 5) {
		throw errorCode.PASSWORD_NOT_VALID;
	}
};

const checkFirstName = (firstName) => {
	if (!firstName || firstName.length === 0) {
		throw errorCode.FIRST_NAME_MISSING;
	} else if (typeof firstName !== "string" || firstName.length < 2 || firstName.length > 100) {
		throw errorCode.FIRST_NAME_NOT_VALID;
	}
};

const checkLastName = (lastName) => {
	if (!lastName || lastName.length === 0) {
		throw errorCode.LAST_NAME_MISSING;
	} else if (typeof lastName !== "string" || lastName.length < 2 || lastName.length > 100) {
		throw errorCode.LAST_NAME_NOT_VALID;
	}
};

module.exports = {
	forgotPassword: (req, res, next) => {
		const { email } = req.body;
		checkEmail(email);
		req.body = {
			email: email && email.toLowerCase()
		};
		next();
	},
	login: (req, res, next) => {
		const { email, password } = req.body;
		checkEmail(email);
		checkPassword(password);
		req.body = {
			email: email && email.toLowerCase(),
			password: password
		};
		next();
	},
	register: (req, res, next) => {
		const {
			firstName, lastName, email, password
		} = req.body;
		checkEmail(email);
		checkPassword(password);
		checkFirstName(firstName);
		checkLastName(lastName);
		req.body = {
			firstName: firstName,
			lastName: lastName,
			email: email && email.toLowerCase(),
			password: password
		};
		next();
	},
	resetPassword: (req, res, next) => {
		const { password, password_again } = req.body;
		checkPassword(password);
		if (!password_again || password_again.length === 0) {
			throw errorCode.PASSWORD_REPEAT;
		} else if (password !== password_again) {
			throw errorCode.PASSWORDS_DONT_MATCH;
		}
		req.body = {
			password: password && password.toString(),
			password_again: password_again && password_again.toString()
		};
		next();
    },
    sanitizeUser: (user) => {
		const sanitazed = {
			id: user._id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName
		};
		return sanitazed;
	}
};