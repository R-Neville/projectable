const THEME_KEY = 'THEME';
const DARK = 'DARK';
const LIGHT = 'LIGHT';

export default class ThemeManager {
  constructor() {
    if (![DARK, LIGHT].includes(this.theme)) {
      this.goLight();
    }
  }

  get theme() {
    return window.localStorage.getItem(THEME_KEY);
  }

  // Sets the THEME key to DARK:
  goDark() {
    window.localStorage.setItem(THEME_KEY, DARK);
  }

  // Sets the THEME key to LIGHT:
  goLight() {
    window.localStorage.setItem(THEME_KEY, LIGHT);
  }
}