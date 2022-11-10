import { createPortal } from 'react-dom';
import { useThemeContext } from '../../context-providers/ThemeProvider';
import Section from '../shared/Section';

function ErrorModal({ open, message }) {
  const { theme } = useThemeContext();

  const onOKButtonClick = () => {
    const customEvent = new CustomEvent('clear-error', {
      bubbles: true,
    });
    document.dispatchEvent(customEvent);
  };

  if (!open) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-opacity-75 transition-opacity"
        style={{ backgroundColor: '#000A' }}
      >
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full sm:items-center sm:p-0">
            <Section
              title="Oops! An error occurred..."
              content={
                <>
                  <p
                    className="p-3 text-center"
                    style={{ color: theme.fgHighlight }}
                  >
                    {message}
                  </p>
                  <button
                    className="py-2 px-3 w-20 rounded"
                    style={{
                      backgroundColor: theme.fgHighlight,
                      color: theme.bgHighlight,
                    }}
                    onClick={onOKButtonClick}
                  >
                    OK
                  </button>
                </>
              }
            />
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default ErrorModal;