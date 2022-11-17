import { useThemeContext } from '../../context-providers/ThemeProvider';
import { useState} from 'react';

function Sidebar({ links}) {
  const { theme } = useThemeContext();
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <>
      <div
        className={`flex flex-col h-full ease-in-out duration-300 translate-x-0 ${
          showSideBar ? 'sm:w-80 w-14' : 'w-14'
        }`}
        style={{ backgroundColor: theme.bgHighlight }}
        onMouseEnter={() => setShowSideBar(true)}
        onMouseLeave={() => setShowSideBar(false)}
      >
        {links}
      </div>
    </>
  );
}

export default Sidebar;
