import axios from 'axios';

const requestHeaders = {
	Accept: 'application/json',
	'Content-Type': 'application/json'
};

const baseURL = 'http://localhost:3000'

axios.interceptors.response.use((response) => response, (error) => {
	if (error && error.response && error.response.status === 401) {
		store.dispatch({ type: actionTypes.UNAUTHORIZED });
		doLogout(store.dispatch, false);
		throw error;
	}
	return error.response;
});

const fetch = async function (request) {

	const error = 'Something went wrong';

	try {
		const response = await axios(request);

		if (response && response.status >= 200 && response.status <= 299) {
			return response.data;
		} else if (response && response.status >= 400 && response.status <= 499) {
			return { error };
		}
		return { error };
	} catch (e) {
		return { error };
	}
};

class Network {

	static get(params = {}) {
		const request = {
			url: baseURL,
			method: 'GET',
			headers: requestHeaders,
			params
		};
		return fetch(request);
	}

	static post({ data, params = {} }) {
		const request = {
			url: baseURL,
			method: 'POST',
			headers: requestHeaders,
			params,
			data
		};
		return fetch(request);
	}
}

export default Network;