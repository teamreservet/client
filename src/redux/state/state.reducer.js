import { stateTypes } from './state.types';

const INITIAL_STATE = {
  statesData: null
};

const stateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case stateTypes.LOAD_STATE:
      return {
        ...state,
        statesData: { ...action.payload }
      };
    default:
      return state;
  }
};

export default stateReducer;
