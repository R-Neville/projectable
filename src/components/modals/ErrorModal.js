import { createPortal } from 'react-dom';
import { useThemeContext } from '../../context-providers/ThemeProvider';
import Section from '../shared/Section';

function ErrorModal({ open, error }) {
  const { theme } = useThemeContext();

  let message = '';
  if (error) {
    message = error.message;
    process.env.NODE_ENV === 'development' && console.error(error);
  }

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
        className="fixed inset-0 bg-opacity-75 z-50 transition-opacity"
        style={{ backgroundColor: '#000A' }}
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full sm:items-center sm:p-0">
            <Section title="Oops! An error occurred...">
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
            </Section>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default ErrorModal;
