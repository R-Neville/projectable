import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../../context-providers/ThemeProvider';
import Frame from '../shared/Frame';

function TaskModal({ open, task, onClose, onDone }) {
  const { theme } = useThemeContext();
  const navigate = useNavigate();

  if (!open) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-opacity-75 transition-opacity"
        style={{ backgroundColor: '#000A' }}
      >
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <Frame
            title={task.brief}
            actions={[
              {
                text: 'View Project',
                onClick: () => navigate(`/projects/${task.projectId}`),
              },
            ]}
          >
            <>
              <p>{task.description}</p>
            </>
          </Frame>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default TaskModal;
