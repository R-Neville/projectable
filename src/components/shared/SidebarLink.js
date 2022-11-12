import { Link } from 'react-router-dom';
import { useThemeContext } from '../../context-providers/ThemeProvider';

function SidebarLink({ lightSrc, darkSrc, to, title, testID }) {
  const { isDarkMode, theme } = useThemeContext();

  return (
    <Link
      className="flex items-center p-4 w-full text-lg hover:bg-gray-500 whitespace-nowrap overflow-x-hidden"
      to={to}
      title={title}
      data-testid={testID}
    >
      <img
        alt=""
        src={isDarkMode ? darkSrc : lightSrc}
        className="w-10 max-w-15 h-10 max-h-15"
      />
      <div
        className="p-4"
        style={{
          color: theme.fgAccent,
        }}
      >
        {title}
      </div>
    </Link>
  );
}

export default SidebarLink;
