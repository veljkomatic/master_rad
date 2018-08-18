import actionTypes from './types';
import Network from '../network';

export const logoutUser = () => async (dispatch) => doLogout(dispatch);

export const doLogout = async (dispatch, logoutRequest = true) => {
    dispatch({
        type: actionTypes.LOGOUT_USER
    });
    Network.setPath('logout');
    const response = await Network.post();
    if(response.error) {
        return dispatch({
            type: actionTypes.LOGOUT_USER_FAIL,
            error: response.error
        });
    }
    localStorage.removeItem('authToken');
    dispatch({
        type: actionTypes.LOGOUT_USER_SUCCESS
    });
};

export const loginUser = (email, password) => async (dispatch) => {
	dispatch({
		type: actionTypes.LOGIN_USER
	});
    Network.setPath('login');
    const response = await Network.post({
        data: {
            email,
            password
        }
    });
    if (response.error) {
        return dispatch({
            type: types.LOGIN_USER_FAIL,
			error: response.error
        });
    }
	localStorage.setItem('authToken', response.data.token || '');
	localStorage.setItem('refreshToken', response.data.refreshToken || '');
    dispatch({
		type: types.LOGIN_USER_SUCCESS, 
		payload: response.data.user
	});
    return { response: response.data.user };
};

export const registerUser = (firstName, lastName, email, password) => async (dispatch) => {
	dispatch({
		type: actionTypes.REGISTER_USER
	});
	Network.setPath('register');
	const response = await Network.post({
		data: {
			firstName,
			lastName,
			email,
			password
		}
	});

	if (response.error) {
		return dispatch({
			type: actionTypes.REGISTER_USER_FAIL,
            error: response.error
		})
	}
	dispatch({
		type: actionTypes.REGISTER_USER_SUCCESS
	});
	return {
		result: true
	};
};

export const sendRecoveryEmail = (email, callback) => async (dispatch) => {
	dispatch({
		type: actionTypes.SEND_RECOVERY_EMAIL
	});
	Network.setPath('forgot');
	const response = await Network.post({
		data: {
			email
		}
	});
	if (response.error) {
		return dispatch({
			type: actionTypes.SEND_RECOVERY_EMAIL_FAIL,
			error: response.error
		});
	}
	dispatch({
		type: actionTypes.SEND_RECOVERY_EMAIL_SUCCESS
	});
	return {
		result: true
	};
};

export const verifyEmail = () => async (dispatch) => {
	dispatch({
		type: actionTypes.VERIFY_EMAIL
	});
	Network.setPath('verify_email');
	const response = await Network.post();
	const verified = response && response.data && response.data.verified;
	const success = response && response.data && response.data.success;

	if (response.error) {
		return dispatch({
			type: actionTypes.VERIFY_EMAIL_FAIL,
			error: response.error
		});
	}
	if (!success && !verified) {
		return dispatch({
			type: actionTypes.VERIFY_EMAIL_FAIL,
			error: 'Email not sent'
		});
	}
	dispatch({
		type: actionTypes.VERIFY_EMAIL_SUCCESS
	})
	return {
		verified,
		result: response.data.message
	};
};