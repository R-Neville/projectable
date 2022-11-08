import axios from 'axios';

const TOKEN_KEY = 'TOKEN';
const HEROKU = 'https://projectable-api.herokuapp.com';
const ROOT_URL =
  process.env.NODE_ENV === 'production' ? HEROKU : 'http://localhost:3001';

export default class UserManager {
  constructor() {
    this._token = this._loadToken();
    if (this._token) {
      this._getUser();
    } else {
      this._user = null;
    }
  }

  get user() {
    return this._user;
  }

  get token() {
    return this._token;
  }

  async register(username, email, password, confirmPassword) {
    try {
      const response = await axios.post(`${ROOT_URL}/users/register`, {
        username, email, password, confirmPassword
      });
      const { error } = response.data;
      if (error) return error;
      this._user = response.data;
      this._setToken(this._user.token);
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  async login(email, password) {
    try {
      const response = await axios.post(`${ROOT_URL}/users/login`, {
        email,
        password,
      });
      const { error } = response.data;
      if (error) return error;
      this._user = response.data;
      this._setToken(this._user.token);
      return null;
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    this._user = null;
    this._setToken('');
  }

  _loadToken() {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  _setToken(token) {
    this._token = token;
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  async _getUser() {
    console.log('get user');
  }
}
