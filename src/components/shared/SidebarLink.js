import { Link } from 'react-router-dom';
import { useThemeContext } from '../../ThemeProvider';

function SidebarLink({ lightSrc, darkSrc, to, title }) {
  const { isDarkMode } = useThemeContext();

  return (
    <Link
      className="p-4 w-full"
      to={to}
      title={title}
      style={{ backgroundColor: 'inherit' }}
    >
      <img alt="" src={isDarkMode ? darkSrc : lightSrc} />
    </Link>
  );
}

export default SidebarLink;
