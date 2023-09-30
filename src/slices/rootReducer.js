
import { combineReducers } from 'redux';
import todoReducer from './todoSlice';
import authReducer from './authSlice';

const rootReducer = combineReducers({
    todo: todoReducer,
    auth: authReducer,
});

export default rootReducer;

