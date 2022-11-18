import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useAuthContext } from '../../context-providers/AuthProvider';
import Section from '../shared/Section';
import Select from 'react-select';
import FormActions from '../shared/FormActions';
import { updateTask } from '../../services/tasksService';
import { showError, buildAxiosErrorHandler } from '../../utils/helpers';
import FormError from '../shared/FormError';

function AssignTaskModal({ open, project, task, onClose, onDone }) {
  const { userManager, logout } = useAuthContext();
  const [selectedUser, setSelectedUser] = useState(null);
  const [formError, setFormError] = useState(null);

  if (!open) return null;

  const options = project.members.map((member) => {
    return { value: member.uid, label: member.email };
  });

  options.push({ value: userManager.user, label: 'Me' });

  const actions = [
    {
      text: 'Cancel',
      type: 'button',
      onClick: () => {
        onClose();
      },
    },
    {
      text: 'Assign',
      type: 'button',
      onClick: () => {
        if (!selectedUser) {
          return setFormError('Please make a selection');
        }
        const updatedTask = {
          ...task,
          assignedTo: selectedUser,
        };

        updateTask(project._id, task._id, updatedTask)
          .then((response) => {
            const { data } = response;
            if (data.error) {
              showError(new Error(data.error));
            } else {
              setFormError(null);
              setSelectedUser(null);
              onClose();
              onDone();
            }
          })
          .catch(buildAxiosErrorHandler(logout));
      },
    },
  ];

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-opacity-75 z-50 transition-opacity"
        style={{ backgroundColor: '#000A' }}
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full sm:items-center sm:p-0">
            <Section title="Assign To">
              {formError && (
                <FormError
                  text={formError}
                  onDismiss={() => setFormError(null)}
                />
              )}
              <Select
                className="basic-single p-1 m-3 w-full border-0 rounded outline-0"
                options={options}
                onChange={(query) => {
                  setSelectedUser(query.value);
                }}
              />
              <FormActions actions={actions} />
            </Section>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default AssignTaskModal;
