import {
  FETCH_USERS,
  FETCH_USERS_FULFILLED,
  FETCH_USERS_REJECTED,
} from '../actions/actionTypes';
import { defaultState } from '../config/constants';

const initialState = { ...defaultState };

export default (state = initialState, action) => {
  const { payload } = action;
  const newState = { ...state };
  switch (action.type) {
    case FETCH_USERS:
      newState.fetching = true;
      break;
    case FETCH_USERS_FULFILLED:
      newState.fetching = false;
      newState.fetched = true;
      newState.error = false;
      newState.payload = payload;
      break;
    case FETCH_USERS_REJECTED:
      newState.fetching = false;
      newState.error = payload;
      break;
    default: break;
  }
  return newState;
};
