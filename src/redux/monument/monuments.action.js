import { monumentActionTypes } from './monument.types';

export const loadMonuments = monuments => ({
  type: monumentActionTypes.LOAD_MONUMENTS,
  payload: monuments
});
