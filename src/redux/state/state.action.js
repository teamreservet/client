import { stateTypes } from './state.types';

export const loadStates = statesData => ({
  type: stateTypes.LOAD_STATE,
  payload: statesData
});
