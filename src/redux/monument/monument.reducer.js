import { monumentActionTypes } from './monument.types';

const INITIAL_STATE = {
  monuments: null
};

const monumentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case monumentActionTypes.LOAD_MONUMENTS: {
      return {
        ...state,
        monuments: action.payload
      };
    }
    default:
      return state;
  }
};

export default monumentReducer;
