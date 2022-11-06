import { useThemeContext } from '../../ThemeProvider';

function SectionP({ text }) {
  const { theme } = useThemeContext();
  return <p className="my-2" style={{ color: theme.fgPrimary }}>{text}</p>;
}

export default SectionP;
