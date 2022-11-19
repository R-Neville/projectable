import ThemeManager from './ThemeManager';

describe("ThemeManager can be used to set user's theme preference", () => {
  test('instantiation without errors', () => {
    const tm = new ThemeManager();
    expect(typeof tm.theme).toBe('string');
  });

  test("goDark method changes theme to 'DARK'", () => {
    const tm = new ThemeManager();
    tm.goDark();
    const expected = 'DARK';
    expect(tm.theme).toBe(expected);
  });

  test("goLight method changes theme to 'LIGHT'", () => {
    const tm = new ThemeManager();
    tm.goLight();
    const expected = 'LIGHT';
    expect(tm.theme).toBe(expected);
  });

  test("theme returns 'LIGHT' after instantiation when set so in local storage", () => {
    window.localStorage.setItem('THEME', 'LIGHT');
    const tm = new ThemeManager();
    expect(tm.theme).toBe('LIGHT');
  });

  test("theme returns 'DARK' after instantiation when set so in local storage", () => {
    window.localStorage.setItem('THEME', 'DARK');
    const tm = new ThemeManager();
    expect(tm.theme).toBe('DARK');
  });
});
