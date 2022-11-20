import { useThemeContext } from '../../context-providers/ThemeProvider';

function Label({ text }) {
  const { theme } = useThemeContext();

  return (
    <label className='my-1' style={{ color: theme.fgPrimary }}>
      {text}
    </label>
  );
}

export default Label;
