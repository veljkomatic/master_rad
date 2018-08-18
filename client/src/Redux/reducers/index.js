import { combineReducers } from 'redux';

import auth from './auth';
import missions from './auth';

export default combineReducers({
    auth,
    missions
});
