import { useState } from 'react';
import { useThemeContext } from '../../context-providers/ThemeProvider';
import DotMenuAction from './DotMenuAction';

function DotMenu({ actions }) {
  const { theme } = useThemeContext();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  let actionEls;

  if (actions) {
    actionEls = actions.map((action, i) => {
      return (
        <DotMenuAction key={i} text={action.text} onClick={action.onClick} />
      );
    });
  }

  const lines = [0, 0, 0].map((_, i) => {
    return (
      <div
        key={i}
        className="rounded-full w-2 h-2"
        style={{ backgroundColor: theme.fgPrimary }}
      ></div>
    );
  });

  const onDotMenuButtonClick = (event) => {
    event.stopPropagation();

    const container = event.target.closest('.dot-menu');

    // This function is used to hide the
    // dropdown when the document is clicked
    // outside the bounds of the user menu:
    const onClickAway = (event) => {
      if (event.target.closest('.dot-menu') !== container) {
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

  return (
    <div className="dot-menu relative">
      <button
        type="button"
        className="flex flex-col justify-evenly items-center p-1 w-10 h-10 rounded-full"
        style={{ backgroundColor: theme.bgHighlight }}
        onClick={onDotMenuButtonClick}
      >
        {lines}
      </button>
      {dropdownVisible && (
        <div
          className="dropdown flex flex-col absolute top-full right-0 z-50 w-48 rounded"
          style={{
            border: `1px solid ${theme.bgHighlight}`,
            backgroundColor: theme.fgHighlight,
          }}
        >
          {actionEls}
        </div>
      )}
    </div>
  );
}

export default DotMenu;
