import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useThemeContext } from '../../context-providers/ThemeProvider';
import Section from '../shared/Section';

function TaskModal({ open, task, onClose }) {
  const { theme } = useThemeContext();
  const navigate = useNavigate();

  if (!open) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-opacity-75 z-50 transition-opacity"
        style={{ backgroundColor: '#000A' }}
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full sm:items-center sm:p-0">
            <Section
              title={task.brief}
              actions={[
                {
                  text: 'View Project',
                  onClick: () => navigate(`/projects/${task.projectId}`),
                },
              ]}
            >
              <p className="p-4">{task.description}</p>
              <div className="flex justify-between items-center">
                <button
                  className="p-3 w-28 rounded m-3"
                  style={{
                    backgroundColor: theme.bgHighlight,
                    color: theme.fgHighlight,
                  }}
                  onClick={onClose}
                >
                  Close
                </button>
                <Link
                  className="p-3 w-28 rounded m-3"
                  style={{
                    backgroundColor: theme.bgHighlight,
                    color: theme.fgHighlight,
                  }}
                  to={`/project/${task.projectId}`}
                  onClick={onClose}
                >
                  View Project
                </Link>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default TaskModal;
