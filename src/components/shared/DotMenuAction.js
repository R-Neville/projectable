import { useThemeContext } from '../../context-providers/ThemeProvider';

function DotMenuAction({ text, onClick }) {
  const { theme } = useThemeContext();

  const onMouseEnter = (event) => {
    event.target.style.backgroundColor = theme.bgAccent + '22';
  };

  const onMouseLeave = (event) => {
    event.target.style.backgroundColor = theme.fgHighlight;
  };

  return (
    <button
      className="p-2 text-left"
      style={{ backgroundColor: theme.fgHighlight, color: theme.bgAccent }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-testid="dot-menu-action"
    >
      {text}
    </button>
  );
}

export default DotMenuAction;
