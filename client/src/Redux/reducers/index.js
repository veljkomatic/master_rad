import { combineReducers } from 'redux';

import auth from './auth';
import missions from './missions';

export default combineReducers({
    auth,
    missions
});
