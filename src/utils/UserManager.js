export default class UserManager {
  constructor() {
    this._user = null;
  }

  get user() {
    return this._user;
  }

  async login() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('login');
        this._user = {};
        resolve();
      }, 1000);
    });
  }

  async logout() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('logout');
        this._user = null;
        resolve();
      }, 1000);
    });
  }
}
