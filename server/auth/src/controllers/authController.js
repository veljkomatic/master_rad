const authService = require('../services/authService');
const errorMap = require('../config/errorMap');
const sanatize = require('../middlewares/sanitizing');


module.exports = ({ router }) => {
	router.post('/login', async (req, res, next) => {
		try {
			const login = await authService.loginPost(req);
			const sanitazed = sanatize.sanitizeUser(login.user);
            res.set('AccessToken', `Bearer ${login.token}`);
            res.set('RefreshToken', login.refreshToken);
			res.send(sanitazed);
		} catch (error) {
			next(error);
			const e = errorMap(error);
			res.status(e.httpStatus).send({ error: e.message });
		}
	});

	router.post('/register', async (req, res, next) => {
		try {
			const registered = await authService.registerPost(req);
			const sanitazed = sanatize.sanitizeUser(registered.user);
            res.set('AccessToken', `Bearer ${registered.token}`);
            res.set('RefreshToken', registered.refreshToken);
			res.send(sanitazed);
		} catch (error) {
			next(error);
			const e = errorMap(error);
			res.status(e.httpStatus).send({ error: e.message });
		}
	});

	router.post('/forgot', async (req, res, next) => {
		try {
			await authService.forgotPost(req);
			res.send();
		} catch (error) {
			next(error);
			const e = errorMap(error);
			res.status(e.httpStatus).send({ error: e.message });
		}
	});

	router.post('/reset', async (req, res, next) => {
		try {
			await authService.resetPost(req);
			res.send();
		} catch (error) {
			next(error);
			const e = errorMap(error);
			res.status(e.httpStatus).send({ error: e.message });
		}
    });
    
    router.get('/verify_email', async (req, res, next) => {
		try {
			const verifiedUser = await authService.verifyEmailGet(req);
			res.send(verifiedUser);
		} catch (error) {
            next(error);
            const e = errorMap(error);
			res.status(e.httpStatus).send({ error: e.message });
		}
	});

	router.post('/verify_email', async (req, res, next) => {
		try {
			const result = await authService.verifyEmailPost(req);
			res.json(result);
		} catch (error) {
			next(error);
			const e = errorMap(error);
			res.status(e.httpStatus).json({ error: e.message });
		}
	});
};