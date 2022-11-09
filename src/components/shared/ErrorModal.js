import { useThemeContext } from '../../context-providers/ThemeProvider';

function ErrorModal({ message }) {
  const { theme } = useThemeContext();

  const onOKButtonClick = () => {
    const customEvent = new CustomEvent('clear-error', {
      bubbles: true,
    });
    document.dispatchEvent(customEvent);
  };

  return (
    <div
      className="flex justify-center items-center fixed top-0 right-0 bottom-0 left-0"
      style={{ backgroundColor: `#00000044` }}
    >
      <div
        className="flex flex-col p-4 rounded"
        style={{ backgroundColor: theme.bgHighlight }}
      >
        <h2 className="text-3xl" style={{ color: theme.fgHighlight }}>
          Oops! An error occurred:
        </h2>
        <p className="p-3 text-center" style={{ color: theme.fgHighlight }}>
          {message}
        </p>
        <button
          className="py-2 px-3 rounded"
          style={{
            backgroundColor: theme.fgHighlight,
            color: theme.bgHighlight,
          }}
          onClick={onOKButtonClick}
        >
          OK
        </button>
      </div>
    </div>
  );
}

export default ErrorModal;
