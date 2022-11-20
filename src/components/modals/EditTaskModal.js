import { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { useThemeContext } from '../../context-providers/ThemeProvider';
import { useAuthContext } from '../../context-providers/AuthProvider';
import Section from '../shared/Section';
import Fieldset from '../shared/Fieldset';
import Label from '../shared/Label';
import Input from '../shared/Input';
import TextArea from '../shared/TextArea';
import FormActions from '../shared/FormActions';
import FormError from '../shared/FormError';
import { updateTask } from '../../services/tasksService';
import { buildAxiosErrorHandler, showError } from '../../utils/helpers';

function EditTaskModal({ open, onClose, onDone, task }) {
  const { theme } = useThemeContext();
  const { logout } = useAuthContext();

  const initialFormState = {
    brief: '',
    description: '',
  };
  const [formState, setFormState] = useState(initialFormState);
  const [formError, setFormError] = useState(null);
  const brief = useCallback(() => task.brief, [task]);
  const description = useCallback(() => task.description, [task]);

  if (!open || !task) return null;

  const onFormInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const formActions = [
    {
      text: 'Cancel',
      type: 'reset',
      onClick: () => {
        onClose();
      },
    },
    {
      text: 'Submit',
      type: 'submit',
      onClick: (event) => {
        event.preventDefault();

        const formData = {
          brief: brief(),
          description: description(),
        };

        if (
          formState.brief.length === 0 &&
          formState.description.length === 0
        ) {
          return setFormError('Required fields are empty');
        }

        if (formState.brief.length > 0) {
          formData.brief = formState.brief;
        }

        if (formState.description.length > 0) {
          formData.description = formState.description;
        }

        updateTask(task.projectId, task._id, formData)
          .then((response) => {
            const { data } = response;
            if (data && data.error) {
              showError(new Error(data.error));
            } else {
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
            <Section title="Edit Task">
              <form className="py-4 w-full">
                {formError && (
                  <FormError
                    text={formError}
                    onDismiss={() => setFormError(null)}
                  />
                )}
                <Fieldset>
                  <Label text="Brief" />
                  <p className="italic" style={{ color: theme.fgHighlight }}>
                    {`"${task.brief}"`}
                  </p>
                  <Input
                    name="brief"
                    type="text"
                    onChange={onFormInputChange}
                  />
                </Fieldset>
                <Fieldset>
                  <Label text="Description" />
                  <p className="italic" style={{ color: theme.fgHighlight }}>
                    {`"${task.description}"`}
                  </p>
                  <TextArea name="description" onChange={onFormInputChange} />
                </Fieldset>
                <FormActions key={task._id} actions={formActions} />
              </form>
            </Section>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default EditTaskModal;
