import { useThemeContext } from '../../context-providers/ThemeProvider';

function Input({ type, name, onChange, placeholder }) {
  const { theme } = useThemeContext();

  return (
    <input
      className="p-1 w-full border-0 rounded outline-0"
      type={type}
      name={name}
      style={{ backgroundColor: theme.bgHighlight, color: theme.fgHighlight }}
      onChange={onChange}
      onInput={onChange}
      placeholder={placeholder}
    />
  );
}

export default Input;
