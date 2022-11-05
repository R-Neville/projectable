import { ThemeManager } from '.';

describe("ThemeManager can be used to set user's theme preference", () => {
  test("instantiation without errors", () => {
    const tm = new ThemeManager();
    expect(typeof tm.theme).toBe("string");
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
});
