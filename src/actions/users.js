import * as api from './api/users';
import {
  FETCH_USERS,
  FETCH_USERS_FULFILLED,
  FETCH_USERS_REJECTED,
} from '../actions/actionTypes';

export const fetchUsers = (params = {}) => (dispatch) => {
  dispatch({ type: FETCH_USERS });
  return api.get(params)
    .then(response => (
      dispatch({
        type: FETCH_USERS_FULFILLED,
        payload: response.data,
      })
    ))
    .catch(error => (
      dispatch({
        type: FETCH_USERS_REJECTED,
        payload: error,
      })
    ));
};
