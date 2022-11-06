import { useThemeContext } from '../ThemeProvider';

function Label({ text }) {
  const { theme } = useThemeContext();

  return (
    <label style={{ color: theme.fgPrimary }}>
      {text}
    </label>
  );
}

export default Label;
