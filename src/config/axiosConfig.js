import axios from 'axios';
import UserManager from '../utils/UserManager';

const HEROKU = 'https://projectable-api.herokuapp.com';

const userManager = new UserManager();

const ROOT_URL =
  process.env.NODE_ENV === 'production' ? HEROKU : 'http://localhost:3001';

const projectableAPI = axios.create({
  baseURL: ROOT_URL,
});

projectableAPI.interceptors.request.use((req) => {
  const token = userManager.token;
  if (token) {
    req.headers['Authorization'] = `Bearer ${token}`;
  }

  return req;
});

export const apiErrors = {
  BAD_REQUEST: 'ERR_BAD_REQUEST',
};

export default projectableAPI;
