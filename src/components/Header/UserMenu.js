import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../../context-providers/ThemeProvider';
import UserMenuAction from './UserMenuAction';
import UserIconDark from '../../assets/icons/user-dark.svg';
import UserIconLight from '../../assets/icons/user-light.svg';

function UserMenu() {
  const navigate = useNavigate();
  const { theme, isDarkMode } = useThemeContext();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const onUserMenuButtonClick = (event) => {
    const container = event.target.closest('.user-menu');

    // This function is used to hide the
    // dropdown when the document is clicked
    // outside the bounds of the user menu:
    const onClickAway = (event) => {
      if (event.target.closest('.user-menu') !== container) {
        setDropdownVisible(false);
      }
    };

    if (dropdownVisible) {
      setDropdownVisible(false);
      document.removeEventListener('click', onClickAway);
    } else {
      setDropdownVisible(true);
      document.addEventListener('click', onClickAway);
    }
  };

  const onDashboardActionClick = () => {
    setDropdownVisible(false);
    navigate('/dashboard');
  };

  const onLogoutActionClick = () => {
    setDropdownVisible(false);
    navigate('/login');
  };

  return (
    <div className="user-menu relative">
      <button
        className="flex justify-center items-center p-3 w-10 h-10 rounded-full ml-2"
        style={{ backgroundColor: theme.bgPrimary }}
        onClick={onUserMenuButtonClick}
      >
        <img alt="" src={isDarkMode ? UserIconLight : UserIconDark} />
      </button>
      {dropdownVisible && (
        <div
          className="dropdown flex flex-col absolute top-full right-0 z-50 w-48 rounded"
          style={{
            border: `1px solid ${theme.bgHighlight}`,
            backgroundColor: theme.fgHighlight,
          }}
        >
          <UserMenuAction text="Dashboard" onClick={onDashboardActionClick} />
          <UserMenuAction text="Logout" onClick={onLogoutActionClick} />
        </div>
      )}
    </div>
  );
}

export default UserMenu;
