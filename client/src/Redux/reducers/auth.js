import { REHYDRATE } from 'redux-persist';
import { actionTypes } from '../actionCreators/types';

const INITIAL_STATE = {
	user: {},
	error: '',
	loading: true
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case REHYDRATE: {
			return {
				user: (action.payload.auth && action.payload.auth.user) || {},
				error: '',
				loading: false
			} || [];
		}
		case actionTypes.LOGIN_USER:
			return {
				...state,
				error: '',
				loading: true
			};
		case actionTypes.LOGIN_USER_SUCCESS:
			return {
				...state,
				error: '',
				loading: false,
				user: action.payload
			};
		case actionTypes.LOGIN_USER_FAIL:
			return {
				...INITIAL_STATE,
				loading: false,
				error: action.error
			};
		case actionTypes.REGISTER_USER:
			return {
				...state,
				loading: true,
				error: ''
			};
		case actionTypes.REGISTER_USER_SUCCESS:
			return {
				...state,
				error: '',
				loading: false,
			};
		case actionTypes.REGISTER_USER_FAIL:
			return {
				...INITIAL_STATE,
				loading: false,
				error: action.error
			};
		case actionTypes.LOGOUT_USER:
			return {
				...INITIAL_STATE,
				loading: true
			};
		case actionTypes.LOGOUT_USER_SUCCESS:
			return {
				...INITIAL_STATE,
				loading: false
			};
		case actionTypes.LOGOUT_USER_FAIL:
			return {
				...INITIAL_STATE,
				loading: false
			};
		default:
			return state;
	}
};
