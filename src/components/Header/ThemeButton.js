import { useThemeContext } from '../../context-providers/ThemeProvider';
import NightIcon from '../../assets/icons/night.svg';
import DayIcon from '../../assets/icons/day.svg';

function ThemeButton() {
  const { theme, isDarkMode, toggleTheme } = useThemeContext();

  const onClick = () => {
    toggleTheme();
  };

  return (
    <button
      className="theme-button flex justify-center items-center p-2 w-10 h-10 rounded-full"
      style={{ backgroundColor: theme.bgPrimary }}
      onClick={onClick}
      data-testid="theme-button"
    >
      <img
        alt={isDarkMode ? 'Moon Icon' : 'Sun Icon'}
        src={isDarkMode ? DayIcon : NightIcon}
        className="w-full h-full"
      />
    </button>
  );
}

export default ThemeButton;
