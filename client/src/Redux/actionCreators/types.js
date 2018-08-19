import keyMirror from 'keymirror';

export const actionTypes = keyMirror({
    LOGOUT_USER: null,
    LOGOUT_USER_SUCCESS: null,
    LOGOUT_USER_FAIL: null,
    LOGIN_USER: null,
    LOGIN_USER_FAIL: null,
    LOGIN_USER_SUCCESS: null,
    REGISTER_USER: null,
    REGISTER_USER_FAIL: null,
    REGISTER_USER_SUCCESS: null,
    
    FINISHED_MISSION: null,
    NEW_STARTING_MISSION: null
});