
const errors = {
	GENERAL_ERROR: { httpStatus: 400, message: 'Bad request' },
	NOT_ALLOWED: { httpStatus: 403, message: 'Not allowed' },
	UNAUTHORIZED: { httpStatus: 401, message: 'Unauthorized' },
	EMAIL_MISSING: { httpStatus: 422, message: 'Email is required' },
	EMAIL_NOT_VALID: { httpStatus: 422, message: 'Email is not valid' },
	PASSWORD_MISSING: { httpStatus: 422, message: 'Password is required' },
	PASSWORD_NOT_VALID: { httpStatus: 422, message: 'Password must be at least 5 characters' },
	PASSWORDS_DONT_MATCH: { httpStatus: 422, message: 'Passwords do not match' },
	PASSWORD_REPEAT: { httpStatus: 422, message: 'Please repeat password' },
	FIRST_NAME_MISSING: { httpStatus: 422, message: 'First name is required' },
	FIRST_NAME_NOT_VALID: { httpStatus: 422, message: 'First name is not valid' },
	LAST_NAME_MISSING: { httpStatus: 422, message: 'Last name is required' },
	LAST_NAME_NOT_VALID: { httpStatus: 422, message: 'Last name is not valid' },
	USER_NOT_EXISTS: { httpStatus: 404, message: 'User does not exist' },
	REGISTER_USER_EXISTS: { httpStatus: 422, message: 'User already exists' }
};

module.exports = errors;