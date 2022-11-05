import { useThemeContext } from '../ThemeProvider';
import ThemeButton from './ThemeButton';

function Header() {
  const { theme } = useThemeContext();
  return (
    <header
      className="flex flex-row p-4 w-full"
      style={{ backgroundColor: theme.bgAccent, color: theme.fgAccent }}
    >
      <h1
        id="logo-full"
        className="p-0 m-0 mr-auto text-4xl"
        style={{ fontFamily: 'Bungee Shade' }}
      >
        PROJECTABLE
      </h1>
      <h1
        id="logo-partial"
        className="p-0 mr-auto text-4xl"
        style={{ display: 'none', fontFamily: 'Bungee Shade' }}
      >
        P
      </h1>
      <ThemeButton />
    </header>
  );
}

export default Header;
