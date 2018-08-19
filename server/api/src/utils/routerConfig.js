
const routes = {
	LOGIN: { name: 'login', url: '/login', consume: 'loginResponse' },
	REGISTER: { name: 'register', url: '/register', consume: 'registerResponse' },
};

module.exports = routes;