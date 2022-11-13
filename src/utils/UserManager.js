const TOKEN_KEY = 'TOKEN';
const USER_KEY = 'USER';

export default class UserManager {
  constructor() {
    if (!this.token) this.user = '';
    if (!this.user) this.token = '';
  }

  get user() {
    return window.localStorage.getItem(USER_KEY);
  }

  set user(userId) {
    window.localStorage.setItem(USER_KEY, userId);
  }

  get token() {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  set token(token) {
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  reset() {
    this.user = '';
    this.token = '';
  }
}
