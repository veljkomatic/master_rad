import axios from 'axios';

import { doLogout }  from './actionCreators';
import store from './store';

const requestHeaders = {
	Accept: 'application/json',
	'Content-Type': 'application/json'
};

const baseURL = 'http://localhost:3100'

axios.interceptors.response.use((response) => response, (error) => {
	if (error && error.response && error.response.status === 401) {
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
	static post({ data, params = {}, url }) {
		const request = {
			baseURL,
			url,
			method: 'POST',
			headers: requestHeaders,
			params,
			data
		};
		return fetch(request);
	}
}

export default Network;