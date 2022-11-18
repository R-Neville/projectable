import { useThemeContext } from '../../context-providers/ThemeProvider';

function Frame({ title, actions, children }) {
  const { theme } = useThemeContext();

  let buttons;
  if (actions) {
    buttons = actions.map((action, i) => {
      return (
        <button
          key={i}
          className="px-3 py-2 rounded"
          style={{ backgroundColor: theme.fgPrimary, color: theme.bgPrimary }}
          onClick={action.onClick}
        >
          {action.text}
        </button>
      );
    });
  }

  return (
    <div
      className="flex flex-col items-center p-4 w-full h-full"
      data-testid="frame"
    >
      <div
        className="flex w-full max-w-3xl py-3"
        style={{ borderBottom: `2px solid ${theme.fgPrimary}` }}
      >
        <h2
          className="w-full mr-auto text-4xl"
          style={{
            color: theme.fgAccent,
          }}
          data-testid="frame-title"
        >
          {title}
        </h2>
        <div>{buttons}</div>
      </div>
      <div className="flex flex-col w-full max-w-3xl">{children}</div>
    </div>
  );
}

export default Frame;
