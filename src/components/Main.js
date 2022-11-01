import { useThemeContext } from '../ThemeProvider';

function Main() {
  const { theme } = useThemeContext();

  return (
    <main
      className="flex grow"
      style={{ backgroundColor: theme.bgPrimary }}
    ></main>
  );
}

export default Main;
