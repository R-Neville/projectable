import { createContext, useContext, useState } from 'react';
import themes, { ThemeManager } from './themes';

const initialTheme = themes.light;
const themeManager = new ThemeManager();

const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    if (theme === themes.light) {
      setTheme(themes.dark);
      themeManager.goDark();
    } else {
      setTheme(themes.light);
      themeManager.goLight();
    }
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
