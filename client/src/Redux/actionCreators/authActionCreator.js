import { actionTypes } from './types';
import Network from '../network';

export const logoutUser = () => async (dispatch) => doLogout(dispatch);

export const doLogout = async (dispatch, logoutRequest = true) => {
    dispatch({
        type: actionTypes.LOGOUT_USER
    });
    const response = await Network.post({
		url: 'logout'
	});
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
    const response = await Network.post({
		url: 'login',
        data: {
            email,
            password
        }
    });
    if (response.error) {
        return dispatch({
            type: actionTypes.LOGIN_USER_FAIL,
			error: response.error
        });
	}
	localStorage.setItem('authToken', response.token || '');
	localStorage.setItem('refreshToken', response.refreshToken || '');
    dispatch({
		type: actionTypes.LOGIN_USER_SUCCESS, 
		payload: response.user
	});
    return {  
		result: true
	};
};

export const registerUser = (firstName, lastName, email, password) => async (dispatch) => {
	dispatch({
		type: actionTypes.REGISTER_USER
	});
	const response = await Network.post({
		url: 'register',
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
	localStorage.setItem('authToken', response.token || '');
	localStorage.setItem('refreshToken', response.refreshToken || '');
	dispatch({
		type: actionTypes.REGISTER_USER_SUCCESS,
		payload: response.user
	});
	return {
		result: true
	};
};