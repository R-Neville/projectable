import { useThemeContext } from '../../context-providers/ThemeProvider';

function FormActions({ actions }) {
  const { theme } = useThemeContext();

  const buttons = actions.map((action, i) => {
    return (
      <button
        key={i}
        className="p-3 w-28 rounded m-3"
        onClick={action.onClick}
        style={{ backgroundColor: theme.bgHighlight, color: theme.fgHighlight }}
      >
        {action.text}
      </button>
    );
  });

  return <div className="flex flex-row justify-end">{buttons}</div>;
}

export default FormActions;
