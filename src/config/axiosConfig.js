import axios from 'axios';
import UserManager from '../utils/UserManager';

const HEROKU = 'https://projectable-api.herokuapp.com';

const userManager = new UserManager();

export const ROOT_URL =
  process.env.NODE_ENV === 'production' ? HEROKU : 'http://localhost:3001';

const projectableAPI = axios.create({
  baseURL: ROOT_URL,
});

// Add Authorization header with token to requests:
projectableAPI.interceptors.request.use((req) => {
  const token = userManager.token;
  if (token) {
    req.headers['Authorization'] = `Bearer ${token}`;
  }

  return req;
});

export const errorCodes = {
  BAD_REQUEST: 'ERR_BAD_REQUEST',
  ERR_NETWORK: 'ERR_NETWORK',
};

export const fatalStatuses = [
  401, // Unauthorized
  403, // Forbidden
  429, // Too many requests
];

export default projectableAPI;
