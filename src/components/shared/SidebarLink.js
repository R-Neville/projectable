import { Link } from 'react-router-dom';
import { useThemeContext } from '../../context-providers/ThemeProvider';

function SidebarLink({ lightSrc, darkSrc, to, title, testID }) {
  const { isDarkMode } = useThemeContext();

  return (
    <Link
      className="p-4 w-full"
      to={to}
      title={title}
      style={{ backgroundColor: 'inherit' }}
      data-testid={testID}
    >
      <img alt="" src={isDarkMode ? darkSrc : lightSrc} />
    </Link>
  );
}

export default SidebarLink;
