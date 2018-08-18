
const routes = {
	LOGIN: { name: 'login', url: '/login', consume: 'loginResponse' },
	REGISTER: { name: 'register', url: '/register', consume: 'registerResponse' },
	FORGOT: { name: 'forgot', url: '/forgot', consume: 'forgotResponse' },
	RESET: { name: 'reset', url: '/reset', consume: 'resetResponse'},
	SEND_VERIFY_EMAIL: { name: 'verify_email', url: '/verify_email', consume: 'sendVerifyEmailResponse' },
	VERIFY_EMAIL: { name: 'verify_email', url: '/verify_email', consume: 'verifyEmailResponse' }
};

module.exports = routes;