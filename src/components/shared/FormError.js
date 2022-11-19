import { useThemeContext } from '../../context-providers/ThemeProvider';

function FormError({ text, onDismiss }) {
  const { theme } = useThemeContext();
  const onButtonClick = (event) => {
    event.preventDefault();
    onDismiss();
  };
  return (
    <div
      className="flex flex-col justify-center items-center p-4 rounded mb-2"
      style={{
        border: `1px solid ${theme.fgError}`,
        backgroundColor: theme.bgError,
        color: theme.fgError,
      }}
    >
      {text}
      <button
        className="py-1 px-2 rounded mt-2"
        style={{ backgroundColor: theme.fgError, color: theme.bgError }}
        onClick={onButtonClick}
        data-testid="dismiss-button"
      >
        Dismiss
      </button>
    </div>
  );
}

export default FormError;
