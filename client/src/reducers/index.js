import { combineReducers } from 'redux';
import posts from './postsReducers';
import auth from './auth';

export default combineReducers({
    posts, auth,
})