import dark from './dark';
import light from './light';

const THEME_KEY = 'THEME';
const DARK = 'DARK';
const LIGHT = 'LIGHT';

export class ThemeManager {
  constructor() {
    if (![DARK, LIGHT].includes(this.theme)) {
      this.goLight();
    }
  }

  get theme() {
    return window.localStorage.getItem(THEME_KEY);
  }

  goDark() {
    window.localStorage.setItem(THEME_KEY, DARK);
  }

  goLight() {
    window.localStorage.setItem(THEME_KEY, LIGHT);
  }
}

const themes = { dark, light };

export default themes;
