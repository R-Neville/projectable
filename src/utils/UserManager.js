const TOKEN_KEY = 'TOKEN';

export default class UserManager {
  constructor() {
    this._idToken = this._loadToken();
    if (this._idToken) {
      this._getUser();
    } else {
      this._user = null;
    }
  }

  get user() {
    return this._user;
  }

  get token() {
    return this._idToken;
  }

  async login() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('login');
        this._setToken('DUMMY_TOKEN');
        this._user = {};
        resolve();
      }, 1000);
    });
  }

  async logout() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('logout');
        this._user = null;
        resolve();
      }, 1000);
    });
  }

  _loadToken() {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  _setToken(token) {
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  async _getUser() {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('get user');
        this._user = {};
        resolve();
      }, 1000);
    });
  }
}
