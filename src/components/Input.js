import { useThemeContext } from '../ThemeProvider';

function Input({ type, name }) {
  const { theme } = useThemeContext();

  return (
    <input
      className="p-1 border-0 rounded outline-0"
      type={type}
      name={name}
      style={{ backgroundColor: theme.bgHighlight, color: theme.fgHighlight }}
    />
  );
}

export default Input;
