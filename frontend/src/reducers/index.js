import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import reducers from './reducers';

export default combineReducers({
    alert,
    auth,
    reducers
});