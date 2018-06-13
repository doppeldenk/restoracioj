import axios from 'axios';
import { apiURL } from '../../config/constants';

export const get = params => axios.get(`${apiURL}/users`, params);
export const post = params => axios.post(`${apiURL}/users`, params);
export const patch = (id, params) => axios.patch(`${apiURL}/users/${id}`, params);
export const del = id => axios.delete(`${apiURL}/users/${id}`);
