import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import monumentReducer from './monument/monument.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  monument: monumentReducer
});

export default rootReducer;
