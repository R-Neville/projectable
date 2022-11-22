import { createContext, useContext, useState } from 'react';
import ThemeManager from '../utils/ThemeManager';
import themes from '../themes';

const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);

export default function ThemeProvider({ children }) {
  // Instantiate ThemeManager to load
  // user's last used theme:
  const themeManager = new ThemeManager();
  let initialTheme;
  if (themeManager.theme === 'DARK') {
    initialTheme = themes.dark;
  } else {
    initialTheme = themes.light;
  }
  
  const [theme, setTheme] = useState(initialTheme);
  const [isDarkMode, setIsDarkMode] = useState(theme === themes.dark);

  const toggleTheme = () => {
    if (theme === themes.light) {
      themeManager.goDark();
      setTheme(themes.dark);
    } else {
      themeManager.goLight();
      setTheme(themes.light);
    }
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
