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
	login: (data) => {
		const { email, password } = data;
		checkEmail(email);
		checkPassword(password);
		return {
			email: email && email.toLowerCase(),
			password: password
		};
	},
	register: (data) => {
		const {
			firstName, lastName, email, password
		} = data;
		checkEmail(email);
		checkPassword(password);
		checkFirstName(firstName);
		checkLastName(lastName);
		return {
			firstName: firstName,
			lastName: lastName,
			email: email && email.toLowerCase(),
			password: password
		};
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