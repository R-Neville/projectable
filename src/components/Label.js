import { useThemeContext } from '../ThemeProvider';

function Label({ text, htmlFor }) {
  const { theme } = useThemeContext();

  return (
    <label htmlFor={htmlFor} style={{ color: theme.fgPrimary }}>
      {text}
    </label>
  );
}

export default Label;
