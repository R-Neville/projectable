import { useThemeContext } from '../../ThemeProvider';
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
    >
      <img
        alt={isDarkMode ? 'Moon Icon' : 'Sun Icon'}
        src={isDarkMode ? NightIcon : DayIcon}
        className="w-full h-full"
      />
    </button>
  );
}

export default ThemeButton;
