import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import monumentReducer from './monument/monument.reducer';
import stateReducer from './state/state.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  monument: monumentReducer,
  statesData: stateReducer
});

export default rootReducer;
