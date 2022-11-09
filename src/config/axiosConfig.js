import axios from 'axios';

const TOKEN_KEY = 'TOKEN';

const HEROKU = 'https://projectable-api.herokuapp.com';

const ROOT_URL =
  process.env.NODE_ENV === 'production' ? HEROKU : 'http://localhost:3001';

const projectableAPI = axios.create({
  baseURL: ROOT_URL,
});

projectableAPI.interceptors.request.use((req) => {
  const token = window.localStorage.getItem(TOKEN_KEY);
  if (token) {
    req.headers['Authorization'] = `Bearer ${token}`;
  }

  return req;
});

export default projectableAPI;
