import { createPortal } from 'react-dom';
import { useThemeContext } from '../../context-providers/ThemeProvider';
import Card from '../shared/Card';
import CardList from '../shared/CardList';
import Section from '../shared/Section';

function ViewMemberModal({ open, member, tasks, onClose }) {
  const { theme } = useThemeContext();

  if (!open) return null;

  const buildTaskCardMenuActions = (task) => {
    const actions = [
      {
        text: 'View Details',
        onClick: () => {
          document.body.dispatchEvent(
            new CustomEvent('show-task', {
              bubbles: true,
              detail: {
                task,
              },
            })
          );
          onClose();
        },
      },
    ];

    return actions;
  };

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-opacity-75 transition-opacity"
        style={{ backgroundColor: '#000A' }}
      >
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full sm:items-center sm:p-0">
            <Section>
              <div className="flex w-full justify-between items-center">
                <div>
                  <h3 className="text-2xl" style={{ color: theme.fgPrimary }}>
                    {member.email}
                  </h3>
                  <h4 className="text-xl" style={{ color: theme.fgPrimary }}>
                    <strong>Username: {member.username}</strong> 
                  </h4>
                </div>
                <button
                  className="py-2 px-3"
                  style={{
                    backgroundColor: theme.bgHighlight,
                    color: theme.fgHighlight,
                  }}
                  onClick={() => onClose()}
                >
                  Close
                </button>
              </div>
              <h4 style={{ color: theme.fgHighlight }}>
                {tasks.length} task{tasks.length === 1 ? '' : 's'}
              </h4>
              <CardList>
                {tasks.map((task, i) => {
                  return (
                    <Card
                      key={i}
                      title={task.brief}
                      menuActions={buildTaskCardMenuActions(task)}
                    />
                  );
                })}
              </CardList>
            </Section>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default ViewMemberModal;
