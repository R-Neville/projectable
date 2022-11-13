import { useThemeContext } from '../../context-providers/ThemeProvider';

function SectionP({ text, center }) {
  const { theme } = useThemeContext();
  return (
    <p
      className={`w-full my-2 ${center && 'text-center'}`}
      style={{ color: theme.fgPrimary }}
    >
      {text}
    </p>
  );
}

export default SectionP;
