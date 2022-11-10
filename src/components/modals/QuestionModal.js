import { createPortal } from 'react-dom';
import { useThemeContext } from '../../context-providers/ThemeProvider';
import Section from '../shared/Section';

function QuestionModal({ open, message, onCancel, onConfirm }) {
  const { theme } = useThemeContext();

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
              title="Question"
              content={
                <>
                  <p
                    className="p-3 text-center"
                    style={{ color: theme.fgHighlight }}
                  >
                    {message}
                  </p>
                  <div className="flex justify-evenly">
                    <button
                      className="py-2 px-3 w-20 rounded mx-3"
                      style={{
                        backgroundColor: theme.fgHighlight,
                        color: theme.bgHighlight,
                      }}
                      onClick={onCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className="py-2 px-3 w-20 rounded mx-3"
                      style={{
                        backgroundColor: theme.fgHighlight,
                        color: theme.bgHighlight,
                      }}
                      onClick={onConfirm}
                    >
                      Yes
                    </button>
                  </div>
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

export default QuestionModal;
