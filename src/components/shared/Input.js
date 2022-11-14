import { useThemeContext } from '../../context-providers/ThemeProvider';

function Input({ type, name, value, onChange }) {
  const { theme } = useThemeContext();

  return (
    <input
      className="p-1 w-full border-0 rounded outline-0"
      type={type}
      name={name}
      value={value}
      style={{ backgroundColor: theme.bgHighlight, color: theme.fgHighlight }}
      onChange={onChange}
      onInput={onChange}
    />
  );
}

export default Input;
