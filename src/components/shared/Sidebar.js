import { useThemeContext } from '../../context-providers/ThemeProvider';

function Sidebar({ links }) {
  const { theme } = useThemeContext();

  return (
    <div
      className="flex flex-col w-16 h-full"
      style={{ backgroundColor: theme.bgHighlight }}
    >
      {links}
    </div>
  );
}

export default Sidebar;
