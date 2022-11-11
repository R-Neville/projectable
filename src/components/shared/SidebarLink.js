import { Link } from 'react-router-dom';
import { useThemeContext } from '../../context-providers/ThemeProvider';

function SidebarLink({ lightSrc, darkSrc, to, title, testID }) {
  const { isDarkMode } = useThemeContext();

  return (
    <Link
      className="flex p-4 w-full whitespace-nowrap overflow-x-hidden"
      to={to}
      title={title}
      style={{ backgroundColor: 'inherit' }}
      data-testid={testID}
    >
      <img alt="" src={isDarkMode ? darkSrc : lightSrc} />
      <h1 className='p-4'>{title}</h1>
    </Link>
  );
}

export default SidebarLink;
